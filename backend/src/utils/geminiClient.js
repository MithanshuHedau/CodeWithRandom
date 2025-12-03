const axios = require("axios");

/**
 * generateRecommendations
 * Calls an external Gemini-compatible LLM endpoint to generate learning
 * recommendations and a suggested learning order for the missing skills.
 *
 * Configuration (via env):
 * - GEMINI_API_URL: full URL of the LLM inference endpoint
 * - GEMINI_API_KEY: bearer API key
 * - GEMINI_MODEL: optional model identifier to pass to the endpoint
 *
 * The function attempts to parse JSON output from the model. If the
 * LLM is not configured or returns an invalid response, it returns null
 * so callers can fall back to a safe default.
 */
async function generateRecommendations(
  role,
  currentSkills = [],
  missingSkills = []
) {
  const apiUrl = process.env.GEMINI_API_URL;
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-1.0";

  if (!apiUrl || !apiKey) {
    // Not configured
    return null;
  }

  const prompt = `You are an expert career coach. Given the role: "${role}", the user's current skills: ${JSON.stringify(
    currentSkills
  )}, and the missing skills: ${JSON.stringify(
    missingSkills
  )}, produce a JSON-only response with this exact structure:\n{\n  "recommendations": [{"skill": "<skill>", "recommendation": "<short actionable advice>"}],\n  "suggestedLearningOrder": ["<skill1>", "<skill2>"]\n}\nFor each missing skill provide one concise (1-2 sentence) actionable recommendation. Prioritize fundamentals first in the suggestedLearningOrder. DO NOT include any extra text outside the JSON.`;

  try {
    const body = { model, prompt, max_tokens: 800 };

    const res = await axios.post(apiUrl, body, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      timeout: 20000,
    });

    // Attempt to extract text from common provider response shapes
    const data = res.data || {};
    let text = null;

    if (typeof data === "string") {
      text = data;
    } else if (data.output && Array.isArray(data.output) && data.output[0]) {
      // e.g., Vertex AI-like: { output: [ { content: [ { type: 'text', text: '...' } ] } ] }
      const out = data.output[0];
      if (
        out.content &&
        Array.isArray(out.content) &&
        out.content[0] &&
        out.content[0].text
      ) {
        text = out.content[0].text;
      } else if (out.text) {
        text = out.text;
      }
    } else if (data.choices && Array.isArray(data.choices) && data.choices[0]) {
      // OpenAI-like: { choices: [ { text } ] }
      text =
        data.choices[0].text ||
        (data.choices[0].message && data.choices[0].message.content);
    } else if (data.reply) {
      text = data.reply;
    } else if (data.result || data.outputText) {
      text = data.result || data.outputText;
    }

    if (!text) {
      // Last attempt: stringify full body
      text = JSON.stringify(data);
    }

    // Try to parse JSON from the model output
    let parsed = null;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      // Attempt to extract JSON substring
      const m = text.match(/\{[\s\S]*\}/);
      if (m) {
        try {
          parsed = JSON.parse(m[0]);
        } catch (er) {
          parsed = null;
        }
      }
    }

    if (!parsed) return null;

    // Normalize output to { recommendations: [strings], suggestedLearningOrder: [strings] }
    const recsRaw = parsed.recommendations || [];
    const recommendations = recsRaw.map((r) => {
      if (!r) return "";
      if (typeof r === "string") return r;
      if (r.skill && r.recommendation) return `${r.skill}: ${r.recommendation}`;
      return JSON.stringify(r);
    });

    const suggestedLearningOrder = Array.isArray(parsed.suggestedLearningOrder)
      ? parsed.suggestedLearningOrder
      : missingSkills;

    return { recommendations, suggestedLearningOrder };
  } catch (err) {
    console.error(
      "geminiClient error:",
      err && err.message ? err.message : err
    );
    return null;
  }
}

module.exports = { generateRecommendations };
