require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const skillGapRoute = require("./routes/skillGap");
const roadmapRoute = require("./routes/roadmapFixed");
const newsRoute = require("./routes/news");
const analysisRoute = require("./routes/analysis");
const rolesRoute = require("./routes/roles");
const authRoute = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/career_db";

app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/skill-gap", skillGapRoute);
app.use("/api/roadmap", roadmapRoute);
app.use("/api/news", newsRoute);
app.use("/api/analysis", analysisRoute);
app.use("/api/roles", rolesRoute);
app.use("/api/auth", authRoute);

// basic health
app.get("/", (req, res) =>
  res.send({ ok: true, message: "Career backend running" })
);

// connect to MongoDB, then start
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
