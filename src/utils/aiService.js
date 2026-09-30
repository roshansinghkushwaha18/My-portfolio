/**
 * AI Service Utility
 * Calls the local Vite middleware or serverless endpoint (/api/chat and /api/marketing-tools)
 * Ensures API key is NEVER exposed to the frontend!
 */

export async function askRoshanAI(userMessage, conversationHistory = []) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        history: conversationHistory
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Server responded with ${res.status}`);
    }

    const data = await res.json();
    return data.reply;
  } catch (err) {
    console.error('[AI Chat Service Error]:', err);
    throw err;
  }
}

export async function generateMarketingContent(toolType, inputPrompt) {
  try {
    const res = await fetch('/api/marketing-tools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: toolType, // 'seo' | 'caption'
        input: inputPrompt
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Server responded with ${res.status}`);
    }

    const data = await res.json();
    return data.output;
  } catch (err) {
    console.error('[Marketing Tools AI Error]:', err);
    throw err;
  }
}
