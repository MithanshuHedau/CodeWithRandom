require("dotenv").config();
const mongoose = require("mongoose");
const Analysis = require("./models/Analysis");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/career_db";

async function main() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected");

  const a = new Analysis({
    targetRole: "Backend Developer",
    currentSkills: ["SQL", "Git"],
    matchedSkills: ["SQL", "Git"],
    missingSkills: ["Java", "Spring Boot", "APIs"],
    recommendations: [
      "Learn Java basics",
      "Learn Spring Boot via small REST API projects",
    ],
  });

  await a.save();
  console.log("Seeded id:", a._id);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
