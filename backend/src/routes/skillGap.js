const express = require("express");
const router = express.Router();
const { PREDEFINED, findRoleKey } = require("../utils/predefinedRoles");
const { jwtAuthMiddleWare } = require("../../jwt");
const { generateRecommendations } = require("../utils/geminiClient");
const Analysis = require("../models/Analysis");

// POST /api/skill-gap
// body: { targetRole: "Backend Developer", currentSkills: ["SQL","Git"] }
router.post("/", jwtAuthMiddleWare, async (req, res) => {
  try {
    const { targetRole, currentSkills } = req.body;
    if (!targetRole)
      return res.status(400).json({ error: "targetRole is required" });

    const normalizedCurr = (currentSkills || []).map((s) => String(s).trim());
    const matchedKey = findRoleKey(targetRole);
    if (!matchedKey) {
      return res.status(400).json({
        error:
          "Unknown role. Allowed roles: " + Object.keys(PREDEFINED).join(", "),
      });
    }

    const roleSkills = PREDEFINED[matchedKey];

    const matched = roleSkills.filter((rs) =>
      normalizedCurr.some((cs) => cs.toLowerCase() === rs.toLowerCase())
    );
    const missing = roleSkills.filter(
      (rs) => !matched.some((m) => m.toLowerCase() === rs.toLowerCase())
    );

    // Try to generate recommendations from Gemini LLM if configured
    let llmResult = null;
    try {
      llmResult = await generateRecommendations(
        matchedKey,
        normalizedCurr,
        missing
      );
    } catch (e) {
      console.error("LLM generation failed:", e && e.message ? e.message : e);
      llmResult = null;
    }

    let recommendations = [];
    let suggestedLearningOrder = [...missing];

    if (
      llmResult &&
      Array.isArray(llmResult.recommendations) &&
      llmResult.recommendations.length
    ) {
      recommendations = llmResult.recommendations;
      if (
        Array.isArray(llmResult.suggestedLearningOrder) &&
        llmResult.suggestedLearningOrder.length
      ) {
        suggestedLearningOrder = llmResult.suggestedLearningOrder;
      }
    } else {
      // Fallback: simple auto-generated strings per missing skill
      recommendations = missing.map(
        (ms) => `Learn ${ms} via online courses & projects.`
      );
    }

    const response = {
      role: targetRole,
      matchedSkills: matched,
      missingSkills: missing,
      recommendations,
      suggestedLearningOrder,
    };

    // optional: if frontend wants to save result, they can call /api/analysis; but we'll also store a record if requested
    if (req.body.save === true) {
      const doc = new Analysis({
        targetRole,
        currentSkills: normalizedCurr,
        matchedSkills: matched,
        missingSkills: missing,
        recommendations,
      });
      await doc.save();
    }

    return res.json(response);
  } catch (err) {
    console.error("skill-gap error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
