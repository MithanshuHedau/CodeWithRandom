const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../../jwt");
const { jwtAuthMiddleWare } = require("../../jwt");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "email and password required" });

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) return res.status(409).json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name: name || null,
      email: email.toLowerCase().trim(),
      passwordHash,
    });
    await user.save();

    let token;
    try {
      token = generateToken({ id: user._id, email: user.email });
    } catch (e) {
      console.error("generateToken error:", e && e.message ? e.message : e);
      if (e && e.message === "JWT_SECRET_NOT_SET") {
        return res
          .status(500)
          .json({ error: "Server misconfiguration: JWT_SECRET not set" });
      }
      throw e;
    }
    return res.status(201).json({
      message: "Registered",
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("auth register err:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "email and password required" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    let token;
    try {
      token = generateToken({ id: user._id, email: user.email });
    } catch (e) {
      console.error("generateToken error:", e && e.message ? e.message : e);
      if (e && e.message === "JWT_SECRET_NOT_SET") {
        return res
          .status(500)
          .json({ error: "Server misconfiguration: JWT_SECRET not set" });
      }
      throw e;
    }
    return res.json({
      message: "Logged in",
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("auth login err:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/auth/me -> return current user profile
router.get("/me", jwtAuthMiddleWare, async (req, res) => {
  try {
    const payload = req.user || {};
    // payload should contain id and email (when token issued)
    const user = await User.findById(payload.id)
      .select("_id name email createdAt")
      .lean();
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({ user });
  } catch (err) {
    console.error("auth me err:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
