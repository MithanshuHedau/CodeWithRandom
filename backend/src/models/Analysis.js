const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema({
  targetRole: { type: String, required: true },
  currentSkills: { type: [String], default: [] },
  matchedSkills: { type: [String], default: [] },
  missingSkills: { type: [String], default: [] },
  recommendations: { type: [String], default: [] },
  roadmap: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Analysis", AnalysisSchema);
