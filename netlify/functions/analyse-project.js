const Anthropic = require('@anthropic-ai/sdk');

// Simple in-memory rate limiter (resets on function cold start)
const requestLog = {};
const RATE_LIMIT = 20;
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

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const { userDescription, allTypes, allFeatures, allAddons } = body;

  if (!userDescription || userDescription.trim().length < 10) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Please provide a more detailed project description.' }),
    };
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const typesContext = (allTypes || []).map(t =>
    `- ${t.name} (id: "${t.id}", Base: $${t.basePrice}): ${t.description}`
  ).join('\n');

  const featuresContext = Object.entries(allFeatures || {}).map(([typeId, features]) => {
    const typeName = (allTypes || []).find(t => t.id === typeId)?.name || typeId;
    const list = features.map(f => `  • id:"${f.id}" — ${f.name} ($${f.price}): ${f.description}`).join('\n');
    return `${typeName}:\n${list}`;
  }).join('\n\n');

  const addonsContext = (allAddons || []).map(a => {
    const price = a.isPercentage ? `+${a.percentage}%` : `$${a.price}`;
    return `  • id:"${a.id}" — ${a.name} (${price}): ${a.description}`;
  }).join('\n');

  const prompt = `You are a helpful assistant for EdohaDeveloped, a professional web development service run by Amen Edoha Engworo. A potential client has described their project in plain English. Your job is to understand what they need and select the right project type, features, and add-ons for them.

AVAILABLE PROJECT TYPES:
${typesContext}

AVAILABLE FEATURES BY PROJECT TYPE:
${featuresContext}

AVAILABLE ADD-ONS (available for any project type):
${addonsContext}

CLIENT'S DESCRIPTION:
"${userDescription}"

Your task:
1. Identify the single best project type for this client
2. Select the most relevant feature IDs from that type's feature list (be generous — select everything genuinely useful for their use case, but don't pad with irrelevant items)
3. Select any relevant add-on IDs that genuinely apply to their situation (e.g. hosting setup, support, rush delivery only if they mentioned urgency)
4. Write a short friendly sentence explaining why you chose this project type
5. Write a professional 2-3 sentence project brief suitable for a formal quote document

RULES:
- suggestedTypeId must be exactly one of the available type IDs
- suggestedFeatureIds must only contain IDs from the feature list for the chosen type
- suggestedAddonIds must only contain IDs from the add-ons list
- Keep language simple and friendly — the client may not be technical
- The projectBrief should sound professional, like something from a formal quote

Respond ONLY with valid JSON in this exact format, no extra text, no markdown:
{
  "suggestedTypeId": "one of: portfolio | landing | website | webapp | ecommerce",
  "reasoning": "A short friendly sentence explaining why this type fits",
  "suggestedFeatureIds": ["array of feature ids from the chosen type only"],
  "suggestedAddonIds": ["array of add-on ids, can be empty"],
  "projectBrief": "A professional 2-3 sentence summary of the client's project for their quote document"
}`;

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = message.content[0].text.trim();
    const parsed = JSON.parse(raw);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    };
  } catch (err) {
    console.error('AI error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'AI analysis failed. Please try again or choose manually.' }),
    };
  }
};
