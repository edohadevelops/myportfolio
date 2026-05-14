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

  const { turn, conversation, clientBudget, maxTurns = 5, allTypes, allFeatures, allAddons } = body;

  if (!conversation || !Array.isArray(conversation)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing conversation array.' }) };
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const convHistory = conversation
    .map(t => [t.question ? `You asked: "${t.question}"` : null, `Client said: "${t.answer}"`].filter(Boolean).join('\n'))
    .join('\n\n');

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

  const budgetNote = clientBudget
    ? `The client has a budget of "${clientBudget}". Be budget-conscious — avoid suggesting features that would clearly push past their range, but don't skip genuinely essential ones.`
    : '';

  const turnCount = conversation.length;
  const forceFinish = turn === 'final' || turnCount >= maxTurns;

  const finalFormat = `{
  "type": "final",
  "suggestedTypeId": "portfolio | landing | website | webapp | ecommerce",
  "reasoning": "one friendly sentence explaining the choice",
  "suggestedFeatureIds": ["relevant feature ids from the chosen type only"],
  "suggestedAddonIds": ["relevant addon ids or empty array"],
  "projectBrief": "2 to 3 sentence professional summary for the quote document"
}`;

  const prompt = forceFinish
    ? `You are helping a client figure out what website they need, on behalf of EdohaDeveloped.

CONVERSATION (${turnCount} exchange${turnCount !== 1 ? 's' : ''}):
${convHistory || '(no exchanges yet)'}

${budgetNote}

AVAILABLE PROJECT TYPES:
${typesContext}

AVAILABLE FEATURES (by project type):
${featuresContext}

AVAILABLE ADD-ONS:
${addonsContext}

You now have all the information you are going to get. Make your best recommendation based on this conversation.

Respond with ONLY valid JSON, no markdown, no extra text:
${finalFormat}`

    : `You are having a friendly conversation with a potential client to help them figure out what website they need, on behalf of EdohaDeveloped.

CONVERSATION SO FAR (${turnCount} exchange${turnCount !== 1 ? 's' : ''} completed, max ${maxTurns}):
${convHistory || '(no exchanges yet)'}

${budgetNote}

AVAILABLE PROJECT TYPES:
${typesContext}

AVAILABLE FEATURES (by project type):
${featuresContext}

AVAILABLE ADD-ONS:
${addonsContext}

Now decide: do you have enough information to confidently recommend a project type and the right features?

You have enough if you know: what their business does, what they want the site to do, and any key functionality they need.
You need more info if there is a meaningful gap that would change your recommendation.

If you need one more specific piece of information — ask it. Keep it under 50 words, conversational, friendly.
If you have enough — return the full selection. Do not ask more questions just for the sake of it.

Respond with ONLY valid JSON, no markdown, no extra text.

If you need more info:
{ "type": "question", "question": "your question here" }

If you have enough info:
${finalFormat}`;

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
    console.error('analyse-project error:', err?.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Analysis failed: ${err?.message}. You can choose manually instead.` }),
    };
  }
};
