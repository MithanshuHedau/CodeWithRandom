const PREDEFINED = {
  "Frontend Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Redux",
    "Tailwind CSS",
    "Responsive Design",
    "Git",
    "Version Control",
    "Browser DevTools",
  ],

  "Backend Developer": [
    "Java",
    "Spring Boot",
    "Node.js",
    "Express.js",
    "SQL",
    "NoSQL",
    "REST APIs",
    "Authentication (JWT, OAuth)",
    "Database Design",
    "Git",
  ],

  "Data Analyst": [
    "Excel",
    "Advanced Excel",
    "SQL",
    "Python",
    "Pandas",
    "NumPy",
    "Data Cleaning",
    "Data Visualization",
    "Power BI",
    "Statistics",
    "Dashboards",
  ],

  "Full Stack Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "SQL",
    "REST APIs",
    "Authentication",
    "Git",
    "Deployment",
  ],

  "DevOps Engineer": [
    "Linux",
    "Bash Scripting",
    "Docker",
    "Kubernetes",
    "CI/CD Pipelines",
    "AWS / Cloud",
    "Monitoring Tools",
    "Networking Basics",
    "Git",
    "Version Control",
  ],
};

const RECOMMENDATIONS = {
  HTML: "Start with HTML basics, semantic tags, forms, and accessibility (a11y). Build 5–10 simple pages.",
  CSS: "Learn CSS fundamentals, Flexbox, Grid, media queries, animations, and responsiveness.",
  JavaScript:
    "Master ES6+, promises, async/await, DOM manipulation, fetch API, localStorage, and array/object methods.",
  React:
    "Build small-to-medium apps. Learn Hooks, Routing, Context API, and component architecture.",
  Redux:
    "Understand reducers, actions, store, and middleware like Redux Thunk.",
  "Tailwind CSS":
    "Practice utility-first design and build responsive layouts faster.",
  Git: "Learn branching strategies, GitHub flow, pull requests, and conflict resolution.",
  "Version Control":
    "Understand commit history, tags, release versions, and collaboration practices.",
  Java: "Learn OOP, collections, exception handling, and multithreading basics.",
  "Spring Boot":
    "Practice building REST APIs, dependency injection, JPA/Hibernate, and layered architecture.",
  SQL: "Learn CRUD operations, joins, subqueries, indexing, stored procedures, and database normalization.",
  NoSQL:
    "Understand MongoDB basics, schemas, aggregation pipelines, and collections.",
  APIs: "Learn REST principles, API versioning, status codes, and use Postman for testing.",
  Python:
    "Practice pandas, NumPy, file handling, automation scripts, and data preprocessing.",
  Pandas: "Learn filtering, grouping, merging, and handling missing data.",
  Excel:
    "Master formulas, pivot tables, charts, conditional formatting, and data cleaning.",
  "Advanced Excel":
    "Learn macros, Power Query, lookup functions, and automation.",
  Dashboards:
    "Practice creating dashboards in Power BI or Excel with DAX functions.",
  Statistics:
    "Learn mean, median, mode, variance, probability, hypothesis testing, and regression.",
  "Node.js": "Understand event loop, streams, modules, and async programming.",
  "Express.js":
    "Learn routing, middleware, API building, validation, and error handling.",
  MongoDB:
    "Design schemas, indexes, relationships, and use Mongoose for data modeling.",
  Authentication:
    "Learn JWT, OAuth, bcrypt (password hashing), session management, and role-based access.",
  Deployment:
    "Learn deploying apps on Vercel, Netlify, AWS EC2, or Render with environment variables.",
  Linux:
    "Learn file system navigation, permissions, processes, and essential commands.",
  Docker:
    "Learn writing Dockerfiles, containers, images, volumes, and docker-compose.",
  Kubernetes:
    "Understand pods, deployments, services, load balancing, scaling, and YAML configs.",
  "CI/CD Pipelines":
    "Learn GitHub Actions, Jenkins, or GitLab CI to automate build & deployments.",
  Cloud:
    "Get familiar with AWS EC2, S3, Lambda, IAM, VPC, and basic cloud fundamentals.",
  "Networking Basics":
    "Learn HTTP/HTTPS, DNS, load balancing, firewalls, subnets, and IP addressing.",
  "Monitoring Tools":
    "Explore Prometheus, Grafana, CloudWatch, and logs analysis.",
};

module.exports = { PREDEFINED, RECOMMENDATIONS };

// helper: find a PREDEFINED role key case-insensitively
function findRoleKey(role) {
  if (!role) return null;
  const normalized = String(role).trim().toLowerCase();
  const keys = Object.keys(PREDEFINED);
  const found = keys.find((k) => k.trim().toLowerCase() === normalized);
  return found || null;
}

module.exports = { PREDEFINED, RECOMMENDATIONS, findRoleKey };
