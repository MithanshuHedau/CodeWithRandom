const express = require("express");
const axios = require("axios");
const router = express.Router();

const HN_BASE = process.env.HN_BASE || "https://hacker-news.firebaseio.com/v0";

// helper to get item
async function fetchItem(id) {
  const url = `${HN_BASE}/item/${id}.json`;
  const resp = await axios.get(url, { timeout: 5000 });
  return resp.data;
}

// GET /api/news
// returns array of { id, title, url, score, time, type, by }
router.get("/", async (req, res) => {
  try {
    // get topstories
    const topUrl = `${HN_BASE}/topstories.json`;
    const topResp = await axios.get(topUrl, { timeout: 5000 });
    const ids = topResp.data || [];

    // take first 12 to filter, then pick first 5 story type
    const candidates = ids.slice(0, 12);

    const promises = candidates.map((id) => fetchItem(id).catch(() => null));
    const items = (await Promise.all(promises)).filter(Boolean);

    // filter to stories and map required fields
    const stories = items
      .filter((i) => i && i.type === "story")
      .slice(0, 5)
      .map((i) => ({
        id: i.id,
        title: i.title,
        url: i.url || null,
        score: i.score,
        time: i.time, // unix timestamp
        type: i.type,
        by: i.by,
      }));

    return res.json({ source: "HackerNews", count: stories.length, stories });
  } catch (err) {
    console.error("news error:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;
