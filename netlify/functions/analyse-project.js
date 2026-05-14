const Anthropic = require('@anthropic-ai/sdk');

const requestLog = {};
const RATE_LIMIT = 30;
const WINDOW_MS = 24 * 60 * 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  if (!requestLog[ip]) requestLog[ip] = [];
  requestLog[ip] = requestLog[ip].filter(t => now - t < WINDOW_MS);
  if (requestLog[ip].length >= RATE_LIMIT) return true;
  requestLog[ip].push(now);
  return false;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const ip = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
  if (isRateLimited(ip)) {
    return {
      statusCode: 429,
      body: JSON.stringify({ error: 'Too many requests. Please try again tomorrow.' }),
    };
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'ANTHROPIC_API_KEY is not configured.' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body.' }) };
  }

  const { turn, conversation, allTypes, allFeatures, allAddons } = body;

  if (!turn || !conversation || !Array.isArray(conversation)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields: turn and conversation.' }),
    };
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // Format conversation history for the prompt
  const convHistory = conversation
    .map((t) => `You asked: "${t.question}"\nThey said: "${t.answer}"`)
    .join('\n\n');

  // ── FOLLOW-UP QUESTIONS (turns q2 and q3) ──
  if (turn === 'q2' || turn === 'q3') {
    const isSecond = turn === 'q2';

    const focus = isSecond
      ? 'Ask one warm, specific follow-up question. Focus on whether they need customers to do anything online — like book, pay, sign up, or create an account. Or dig into a key feature they mentioned. Keep it under 45 words.'
      : 'Ask one final question. Focus on their timeline or any specific tools or integrations they might need — like maps, social media feeds, payment options, or anything else. Keep it under 45 words.';

    const prompt = `You are having a friendly conversation with a potential client to help them figure out what kind of website they need. You work for EdohaDeveloped.

Here is the conversation so far:

${convHistory}

${focus}

Write ONLY the question. No intro, no label, just the question itself. Conversational and friendly tone.`;

    try {
      const msg = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 100,
        messages: [{ role: 'user', content: prompt }],
      });

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: msg.content[0].text.trim() }),
      };
    } catch (err) {
      console.error('Follow-up error:', err?.message);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `Follow-up question failed: ${err?.message}` }),
      };
    }
  }

  // ── FINAL ANALYSIS (turn = 'final') ──
  if (turn === 'final') {
    const typesContext = (allTypes || [])
      .map(t => `  id:"${t.id}" — ${t.name} ($${t.basePrice}): ${t.description}`)
      .join('\n');

    const featuresContext = Object.entries(allFeatures || {}).map(([typeId, features]) => {
      const typeName = (allTypes || []).find(t => t.id === typeId)?.name || typeId;
      const list = features.map(f => `    id:"${f.id}" — ${f.name} ($${f.price})`).join('\n');
      return `  ${typeName}:\n${list}`;
    }).join('\n\n');

    const addonsContext = (allAddons || [])
      .map(a => `  id:"${a.id}" — ${a.name} (${a.isPercentage ? `+${a.percentage}%` : `$${a.price}`})`)
      .join('\n');

    const prompt = `You are helping a client figure out what kind of website they need for EdohaDeveloped. Based on everything they told you, select the right project type, features, and add-ons, then write a professional project brief.

FULL CONVERSATION:
${convHistory}

AVAILABLE PROJECT TYPES:
${typesContext}

AVAILABLE FEATURES (grouped by project type):
${featuresContext}

AVAILABLE ADD-ONS:
${addonsContext}

Your job:
1. Pick the single best project type based on what they described
2. Select the most relevant feature IDs from that type (be thorough — select everything genuinely useful, skip anything irrelevant)
3. Select any relevant add-on IDs (only suggest rush delivery if they mentioned urgency)
4. Write one friendly sentence explaining why you chose this project type
5. Write a clean 2 to 3 sentence project brief for their quote document

Rules:
  suggestedTypeId must be one of the available type IDs
  suggestedFeatureIds must only use IDs from the chosen type's feature list
  suggestedAddonIds must only use IDs from the add-ons list
  The projectBrief should sound professional but readable

Respond with ONLY valid JSON, no markdown, no extra text:
{
  "suggestedTypeId": "portfolio | landing | website | webapp | ecommerce",
  "reasoning": "One friendly sentence explaining why this type fits",
  "suggestedFeatureIds": ["feature id", "..."],
  "suggestedAddonIds": ["addon id or empty array"],
  "projectBrief": "2 to 3 sentence professional summary of the client project"
}`;

    try {
      const msg = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      const raw = msg.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
      const parsed = JSON.parse(raw);

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      };
    } catch (err) {
      console.error('Final analysis error:', err?.message);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `Analysis failed: ${err?.message}. You can still choose manually.` }),
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ error: `Unknown turn value: "${turn}". Expected q2, q3, or final.` }),
  };
};
