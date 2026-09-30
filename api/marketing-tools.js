/**
 * Serverless API Handler: /api/marketing-tools
 * Generates SEO titles & Instagram captions via Gemini API or intelligent templates.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, input = {} } = req.body || {};
  const topic = input.topic || 'Digital Marketing with AI';
  const tone = input.tone || 'high-intent';
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 10) {
    try {
      const prompt =
        type === 'seo'
          ? `You are an expert SEO copywriter. Generate 3 high-CTR, Google-optimized Title Tags (under 60 chars) and Meta Descriptions (under 155 chars) for the topic: "${topic}". Tone: ${tone}. Format clearly with numbers.`
          : `You are an expert Instagram growth strategist. Write a high-converting Instagram caption with a powerful 3-second hook, structured body bullets, emojis, call to action, and 6 relevant hashtags for: "${topic}". Tone: ${tone}.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 350, temperature: 0.7 }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const output = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (output) {
          return res.status(200).json({ output });
        }
      }
    } catch (err) {
      console.error('Gemini call failed in marketing-tools:', err);
    }
  }

  // Fallback Engine
  let output = '';
  if (type === 'seo') {
    output = `1. [High CTR]: 7 Proven Strategies for ${topic} in 2025
Meta Description: Discover how data-driven marketers leverage ${topic} to cut CAC and drive record conversions. Full case study inside.

2. [Search Intent]: The Step-by-Step Guide to ${topic} | Roshan Kushwaha
Meta Description: Master modern SEO and performance funnels. Learn how to rank and convert target searchers effortlessly.

3. [Authority Hook]: Why Brands are Doubling Down on ${topic}
Meta Description: Explore actionable growth metrics, conversion breakdowns, and AI workflows engineered for scalable ROI.`;
  } else {
    output = `Stop ignoring ${topic} in 2025 🚀👇

Here is the exact framework we use to turn cold audiences into loyal buyers:

⚡ 1. Hook with clear outcome
⚡ 2. Deliver high information gain
⚡ 3. Eliminate purchase friction

Double-tap if you are leveraging AI workflows in your marketing stack! ❤️

#DigitalMarketing #GrowthHacker #AIMarketing #SEOStrategy #${topic.replace(/\s+/g, '')} #RoshanKushwaha`;
  }

  return res.status(200).json({ output });
}
