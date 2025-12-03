const express = require("express");
const router = express.Router();
const Analysis = require("../models/Analysis");
const { jwtAuthMiddleWare } = require("../../jwt");

// POST /api/analysis  -> save an analysis doc
router.post("/", jwtAuthMiddleWare, async (req, res) => {
  try {
    const payload = req.body;
    const doc = new Analysis(payload);
    await doc.save();
    return res.status(201).json({ message: "Saved", id: doc._id });
  } catch (err) {
    console.error("save analysis err:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/analysis -> list recent
router.get("/", async (req, res) => {
  try {
    const docs = await Analysis.find().sort({ createdAt: -1 }).limit(50).lean();
    return res.json({ count: docs.length, docs });
  } catch (err) {
    console.error("list analysis err:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
