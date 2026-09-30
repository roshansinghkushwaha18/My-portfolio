/**
 * Vercel / Netlify Serverless API Handler: /api/chat
 * Answers visitor queries about Roshan Singh Kushwaha using Gemini or intelligent grounded fallback.
 */

const ROSHAN_CONTEXT = `
You are the AI Assistant for Roshan Singh Kushwaha's portfolio website.
Roshan Singh Kushwaha is a student pursuing his BBA in Digital Marketing and Artificial Intelligence at Lovely Professional University (LPU), Phagwara, Punjab (2026 - 2029).
His core skills include:
- Search Engine Optimization (Technical SEO, On-page semantics, Schema, Semrush, Ahrefs, Google Search Console)
- Paid Advertising & Performance (Meta Ads Manager, Advantage+, Google Search Ads, Performance Max, CRO)
- Generative AI & Automation (ChatGPT Prompt Engineering, Midjourney, Claude AI, Make.com, Zapier, GEO / Generative Engine Optimization)
- Analytics (Google Analytics 4 / GA4, Looker Studio, Conversion Funnels)
- Content & Design (Canva Pro, Copywriting, Video Scripting)

Key Projects:
1. "AI-Powered Omnichannel E-Commerce Scale": scaled client blended ROAS to 4.8x, +140% revenue surge, -$38% CAC.
2. "Organic Topical Authority & Technical SEO Engine": +310% organic sessions, 28 keywords in Google Top 3, 185k monthly impressions.
3. "High-Intent Google Ads & Funnel CRO Overhaul": +175% qualified leads, -46% Cost per lead, 6.8% landing page CVR.
4. "Viral Short-Form Content Engine": 1.2M+ organic views, +18.5k followers.
5. "Autonomous AI Marketing Agent": <20s lead response time via Make.com and Claude AI.

Key Experience:
1. "Digital Marketing & AI Growth Intern" at Nexus Digital Growth Lab (Jan 2025 - Present)
2. "SEO & Content Marketing Strategist" at Apex Media & Brand Consulting (May 2024 - Dec 2024)
3. "Campus Digital Brand Ambassador & Marketing Lead" at LPU Student Innovation & Marketing Council (Aug 2023 - Apr 2024)

Certifications: 2 Verified Credentials - Microsoft & NCVET (SOAR - AI to be Aware, NSQF Level 2) and Flipkart SCOA (Supply Chain Operations Academy - Warehousing & Digital Logistics).
Current Status: Actively available for Summer 2026/2027 internships and growth roles.
Tone: Professional, enthusiastic, data-driven, and concise.
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history = [] } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 10) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: ROSHAN_CONTEXT }]
            },
            contents: [
              ...history.map((h) => ({
                role: h.role === 'user' ? 'user' : 'model',
                parts: [{ text: h.text }]
              })),
              { role: 'user', parts: [{ text: message }] }
            ],
            generationConfig: {
              maxOutputTokens: 350,
              temperature: 0.7
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I'd be glad to tell you more about Roshan's work! Feel free to ask about his campaigns or LPU studies.";
        return res.status(200).json({ reply: replyText });
      }
    } catch (err) {
      console.error('Gemini API call failed, falling back to local engine:', err);
    }
  }

  // Intelligent Grounded Fallback Engine
  const q = message.toLowerCase();
  let reply = '';

  if (q.includes('skill') || q.includes('tool') || q.includes('stack')) {
    reply = "Roshan specializes in Paid Ads (Meta Advantage+ & Google Ads), Technical SEO (Semrush, GA4), Generative AI tools (ChatGPT, Midjourney, Claude), workflow automations (Make.com, Zapier), and Canva Pro visual design.";
  } else if (q.includes('lpu') || q.includes('education') || q.includes('university') || q.includes('college')) {
    reply = "Roshan is currently pursuing his Bachelor of Business Administration (BBA) with specialization in Digital Marketing & Artificial Intelligence at Lovely Professional University (LPU), Phagwara, Punjab (2026 - 2029). He completed his Intermediate (12th) and Secondary (10th) from Shiv Shakti Public School.";
  } else if (q.includes('roas') || q.includes('project') || q.includes('ecommerce') || q.includes('case study')) {
    reply = "In his featured D2C E-Commerce campaign, Roshan achieved a 4.8x blended ROAS by combining Meta Advantage+ shopping campaigns with Midjourney-generated ad variants, driving over $42,000 in tracked sales and slashing CAC by 38%.";
  } else if (q.includes('intern') || q.includes('hire') || q.includes('available') || q.includes('job')) {
    reply = "Yes! Roshan is actively looking for Summer 2026/2027 internships and growth marketing roles. You can click 'Hire Me', 'Book a Call', or reach him directly on WhatsApp!";
  } else if (q.includes('certif') || q.includes('microsoft') || q.includes('flipkart')) {
    reply = "Roshan holds 2 verified industry credentials: 1) Microsoft & NCVET (SOAR: AI to be Aware - NSQF Level 2), and 2) Flipkart SCOA (Supply Chain Operations Academy - Warehousing & Digital Logistics).";
  } else {
    reply = `Thanks for asking! Roshan Singh Kushwaha is a BBA Digital Marketing & AI student at LPU specializing in paid media scaling (4.8x ROAS), SEO topical authority, and automated AI workflows. You can book a 1-on-1 call with him or reach out via WhatsApp!`;
  }

  return res.status(200).json({ reply });
}
