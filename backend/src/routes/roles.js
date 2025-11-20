const express = require("express");
const router = express.Router();
const { PREDEFINED } = require("../utils/predefinedRoles");

// GET /api/roles -> list available predefined roles
router.get("/", (req, res) => {
  try {
    const roles = Object.keys(PREDEFINED);
    return res.json({ count: roles.length, roles });
  } catch (err) {
    console.error("roles list err:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
