const express = require("express");
const { PREDEFINED, findRoleKey } = require("../utils/predefinedRoles");

// POST /api/roadmap
// body: { targetRole: "Backend Developer" }
router.post("/", (req, res) => {
  try {
    const { targetRole } = req.body;
    if (!targetRole)
      return res.status(400).json({ error: "targetRole is required" });

    // find canonical role key (case-insensitive)
    const matchedKey = findRoleKey(targetRole);

    let roadmap = {};

    switch ((matchedKey || "").toLowerCase()) {
      case "backend developer":
        roadmap = {
          phase1: {
            title: "Phase 1 (1–2 months): Core Fundamentals",
            items: [
              "Language fundamentals (Java / Node.js)",
              "OOP and design patterns",
              "Version control with Git",
            ],
            resources: [
              "Official Java tutorials / Node.js docs",
              "Clean Code chapters on naming & functions",
            ],
            projects: ["CLI apps, small REST endpoints"],
            checkpoints: ["Implement CRUD API with tests"],
          },
          phase2: {
            title: "Phase 2 (2–3 months): Backend Stack & Databases",
            items: [
              "Web frameworks (Spring Boot or Express)",
              "Relational DBs (Postgres/MySQL) and ORMs",
              "REST API design, auth (JWT)",
              "Logging & error handling",
            ],
            resources: ["Spring guides / Express docs", "SQLBolt"],
            projects: ["Todo API with authentication, DB migrations"],
            checkpoints: [
              "Add user auth, role-based routes, and database tests",
            ],
          },
          phase3: {
            title: "Phase 3 (2 months): Production, Testing & System Design",
            items: [
              "Unit & integration testing (JUnit, Mocha)",
              "Containerization (Docker)",
              "Basic system design and scaling patterns",
              "CI/CD pipelines and monitoring basics",
            ],
            resources: ["Docker docs", "Testing libraries docs"],
            projects: [
              "Deploy API to cloud (Heroku/Render/AWS), add CI and health checks",
            ],
            checkpoints: [
              "Deployment with automatic tests and staging environment",
            ],
          },
          phase4: {
            title: "Phase 4 (ongoing): Advanced Topics",
            items: [
              "Performance tuning & caching (Redis)",
              "Distributed systems fundamentals",
              "Security hardening & observability",
            ],
            projects: ["Design a scalable microservice and benchmark it"],
          },
        };
        break;

      case "frontend developer":
        roadmap = {
          phase1: {
            title: "Phase 1 (1–2 months): Web Foundations",
            items: [
              "HTML semantics and accessibility (a11y)",
              "Modern CSS (Flexbox, Grid), responsive layouts",
              "Vanilla JavaScript (ES6+)",
            ],
            resources: ["MDN Web Docs", "A11y guidelines"],
            projects: ["Landing pages, responsive components"],
            checkpoints: ["Build accessible responsive page"],
          },
          phase2: {
            title: "Phase 2 (2 months): Frameworks & State",
            items: [
              "React fundamentals and hooks",
              "Routing, state management (Context/Redux)",
              "Component design & testing (Jest, RTL)",
            ],
            resources: ["React docs", "Testing Library docs"],
            projects: ["SPA with routing, auth, and forms"],
            checkpoints: ["Add unit/integration tests and CI"],
          },
          phase3: {
            title: "Phase 3 (1–2 months): Performance & Production",
            items: [
              "Performance optimization (code-splitting)",
              "Accessibility & SEO basics",
              "Deployment & CDN usage",
            ],
            resources: ["Lighthouse", "Web Vitals docs"],
            projects: ["Deploy performant portfolio and measure metrics"],
            checkpoints: ["Achieve good Lighthouse scores"],
          },
          phase4: {
            title: "Phase 4: Advanced Topics",
            items: [
              "Design systems",
              "TypeScript adoption",
              "Progressive Web Apps",
            ],
          },
        };
        break;

      case "full stack developer":
        roadmap = {
          phase1: {
            title: "Phase 1 (1–2 months): Fundamentals (Frontend + Backend)",
            items: [
              "HTML/CSS/JS basics",
              "Language fundamentals for backend (Node.js or Java)",
              "Git and collaboration workflows",
            ],
            projects: ["Static site + simple API endpoint"],
          },
          phase2: {
            title: "Phase 2 (2–3 months): Build Full Stack Apps",
            items: [
              "Frontend framework (React) + routing",
              "Backend framework (Express/Spring) + DB",
              "RESTful APIs and authentication",
            ],
            projects: [
              "Full stack app with login, CRUD, and a dashboard (deployed)",
            ],
            checkpoints: ["End-to-end integration tests and CI/CD"],
          },
          phase3: {
            title: "Phase 3 (2 months): Deploy, Scale & Security",
            items: [
              "Dockerize apps, use managed DB, setup CI/CD",
              "Add monitoring, logging, and secrets management",
              "Basic scaling and caching strategies",
            ],
            projects: ["Deploy production-ready app, add load testing"],
          },
          phase4: {
            title: "Phase 4: Portfolio & Interview Prep",
            items: [
              "Polish projects, write READMEs",
              "Study system design basics",
            ],
          },
        };
        break;

      case "devops engineer":
        roadmap = {
          phase1: {
            title: "Phase 1 (1–2 months): Foundations",
            items: [
              "Linux fundamentals and shell scripting",
              "Networking basics (DNS, HTTP, TLS)",
              "Version control and Git workflows",
            ],
            resources: ["Linux Handbook", "Networking for Devs"],
            checkpoints: ["Automate simple tasks with bash/python"],
          },
          phase2: {
            title: "Phase 2 (2 months): Containerization & CI/CD",
            items: [
              "Docker and images, multi-stage builds",
              "Container orchestration (Kubernetes basics)",
              "CI/CD pipelines (GitHub Actions / Jenkins)",
            ],
            projects: [
              "CI pipeline that builds, tests, and deploys containers",
            ],
            checkpoints: ["Create Helm chart and deploy to k8s cluster"],
          },
          phase3: {
            title: "Phase 3 (2 months): Cloud & Infra as Code",
            items: [
              "Cloud fundamentals (AWS/GCP/Azure)",
              "IaC (Terraform/Bicep)",
              "Monitoring and observability (Prometheus/Grafana)",
            ],
            projects: ["Provision infra with Terraform and deploy app"],
            checkpoints: ["Setup alerting and incident runbooks"],
          },
          phase4: {
            title: "Phase 4: Security & Reliability",
            items: ["Secrets management", "Chaos testing", "SRE practices"],
          },
        };
        break;

      case "data analyst":
        roadmap = {
          phase1: {
            title: "Phase 1 (1 month): Spreadsheet & SQL Basics",
            items: ["Excel fundamentals", "Basic SQL queries"],
            projects: ["Analyze a dataset with pivot tables and SQL queries"],
          },
          phase2: {
            title: "Phase 2 (1–2 months): Python & Visualization",
            items: [
              "Python (pandas)",
              "Data visualization (Matplotlib/Seaborn)",
            ],
            projects: ["Build a dashboard using PowerBI or Streamlit"],
          },
          phase3: {
            title: "Phase 3 (1–2 months): Advanced Analysis",
            items: [
              "Advanced SQL",
              "Statistical inference",
              "Feature engineering",
            ],
            projects: ["End-to-end analytics project with storytelling"],
          },
        };
        break;

      default:
        // Generic detailed roadmap built from PREDEFINED skills where possible
        const recommended = PREDEFINED[matchedKey];
        if (recommended) {
          roadmap = {
            phase1: {
              title: "Phase 1 (1–2 months): Basics",
              items: recommended.slice(0, 3),
            },
            phase2: {
              title: "Phase 2 (2 months): Core Tools",
              items: recommended.slice(3, 7),
            },
            phase3: {
              title: "Phase 3 (1–2 months): Projects & Apply",
              items: recommended.slice(7),
            },
          };
        } else {
          roadmap = {
            phase1: {
              title: "Phase 1 (1–2 months): Basics",
              items: ["Core fundamentals"],
            },
            phase2: {
              title: "Phase 2 (2 months): Intermediate",
              items: ["Build projects"],
            },
            phase3: {
              title: "Phase 3 (1–2 months): Finalize",
              items: ["Deploy & document"],
            },
          };
        }
    }

    return res.json({ role: targetRole, roadmap });
  } catch (err) {
    console.error("roadmap error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
const express = require("express");
const { PREDEFINED, findRoleKey } = require("../utils/predefinedRoles");

// POST /api/roadmap
// body: { targetRole: "Backend Developer" }
router.post("/", (req, res) => {
  try {
    const { targetRole } = req.body;
    if (!targetRole)
      return res.status(400).json({ error: "targetRole is required" });

    // find canonical role key (case-insensitive)
    const matchedKey = findRoleKey(targetRole);

    let roadmap = {};

    switch ((matchedKey || "").toLowerCase()) {
      case "backend developer":
        roadmap = {
          phase1: {
            title: "Phase 1 (1–2 months): Core Fundamentals",
            items: [
              "Language fundamentals (Java / Node.js)",
              "OOP and design patterns",
              "Version control with Git",
            ],
            resources: [
              "Official Java tutorials / Node.js docs",
              "Clean Code chapters on naming & functions",
            ],
            projects: ["CLI apps, small REST endpoints"],
            checkpoints: ["Implement CRUD API with tests"],
          },
          phase2: {
            title: "Phase 2 (2–3 months): Backend Stack & Databases",
            items: [
              "Web frameworks (Spring Boot or Express)",
              "Relational DBs (Postgres/MySQL) and ORMs",
              "REST API design, auth (JWT)",
              "Logging & error handling",
            ],
            resources: ["Spring guides / Express docs", "SQLBolt"],
            projects: ["Todo API with authentication, DB migrations"],
            checkpoints: [
              "Add user auth, role-based routes, and database tests",
            ],
          },
          phase3: {
            title: "Phase 3 (2 months): Production, Testing & System Design",
            items: [
              "Unit & integration testing (JUnit, Mocha)",
              "Containerization (Docker)",
              "Basic system design and scaling patterns",
              "CI/CD pipelines and monitoring basics",
            ],
            resources: ["Docker docs", "Testing libraries docs"],
            projects: [
              "Deploy API to cloud (Heroku/Render/AWS), add CI and health checks",
            ],
            checkpoints: [
              "Deployment with automatic tests and staging environment",
            ],
          },
          phase4: {
            title: "Phase 4 (ongoing): Advanced Topics",
            items: [
              "Performance tuning & caching (Redis)",
              "Distributed systems fundamentals",
              "Security hardening & observability",
            ],
            projects: ["Design a scalable microservice and benchmark it"],
          },
        };
        break;

      case "frontend developer":
        roadmap = {
          phase1: {
            title: "Phase 1 (1–2 months): Web Foundations",
            items: [
              "HTML semantics and accessibility (a11y)",
              "Modern CSS (Flexbox, Grid), responsive layouts",
              "Vanilla JavaScript (ES6+)",
            ],
            resources: ["MDN Web Docs", "A11y guidelines"],
            projects: ["Landing pages, responsive components"],
            checkpoints: ["Build accessible responsive page"],
          },
          phase2: {
            title: "Phase 2 (2 months): Frameworks & State",
            items: [
              "React fundamentals and hooks",
              "Routing, state management (Context/Redux)",
              "Component design & testing (Jest, RTL)",
            ],
            resources: ["React docs", "Testing Library docs"],
            projects: ["SPA with routing, auth, and forms"],
            checkpoints: ["Add unit/integration tests and CI"],
          },
          phase3: {
            title: "Phase 3 (1–2 months): Performance & Production",
            items: [
              "Performance optimization (code-splitting)",
              "Accessibility & SEO basics",
              "Deployment & CDN usage",
            ],
            resources: ["Lighthouse", "Web Vitals docs"],
            projects: ["Deploy performant portfolio and measure metrics"],
            checkpoints: ["Achieve good Lighthouse scores"],
          },
          phase4: {
            title: "Phase 4: Advanced Topics",
            items: [
              "Design systems",
              "TypeScript adoption",
              "Progressive Web Apps",
            ],
          },
        };
        break;

      case "full stack developer":
        roadmap = {
          phase1: {
            title: "Phase 1 (1–2 months): Fundamentals (Frontend + Backend)",
            items: [
              "HTML/CSS/JS basics",
              "Language fundamentals for backend (Node.js or Java)",
              "Git and collaboration workflows",
            ],
            projects: ["Static site + simple API endpoint"],
          },
          phase2: {
            title: "Phase 2 (2–3 months): Build Full Stack Apps",
            items: [
              "Frontend framework (React) + routing",
              "Backend framework (Express/Spring) + DB",
              "RESTful APIs and authentication",
            ],
            projects: [
              "Full stack app with login, CRUD, and a dashboard (deployed)",
            ],
            checkpoints: ["End-to-end integration tests and CI/CD"],
          },
          phase3: {
            title: "Phase 3 (2 months): Deploy, Scale & Security",
            items: [
              "Dockerize apps, use managed DB, setup CI/CD",
              "Add monitoring, logging, and secrets management",
              "Basic scaling and caching strategies",
            ],
            projects: ["Deploy production-ready app, add load testing"],
          },
          phase4: {
            title: "Phase 4: Portfolio & Interview Prep",
            items: [
              "Polish projects, write READMEs",
              "Study system design basics",
            ],
          },
        };
        break;

      case "devops engineer":
        roadmap = {
          phase1: {
            title: "Phase 1 (1–2 months): Foundations",
            items: [
              "Linux fundamentals and shell scripting",
              "Networking basics (DNS, HTTP, TLS)",
              "Version control and Git workflows",
            ],
            resources: ["Linux Handbook", "Networking for Devs"],
            checkpoints: ["Automate simple tasks with bash/python"],
          },
          phase2: {
            title: "Phase 2 (2 months): Containerization & CI/CD",
            items: [
              "Docker and images, multi-stage builds",
              "Container orchestration (Kubernetes basics)",
              "CI/CD pipelines (GitHub Actions / Jenkins)",
            ],
            projects: [
              "CI pipeline that builds, tests, and deploys containers",
            ],
            checkpoints: ["Create Helm chart and deploy to k8s cluster"],
          },
          phase3: {
            title: "Phase 3 (2 months): Cloud & Infra as Code",
            items: [
              "Cloud fundamentals (AWS/GCP/Azure)",
              "IaC (Terraform/Bicep)",
              "Monitoring and observability (Prometheus/Grafana)",
            ],
            projects: ["Provision infra with Terraform and deploy app"],
            checkpoints: ["Setup alerting and incident runbooks"],
          },
          phase4: {
            title: "Phase 4: Security & Reliability",
            items: ["Secrets management", "Chaos testing", "SRE practices"],
          },
        };
        break;

      case "data analyst":
        roadmap = {
          phase1: {
            title: "Phase 1 (1 month): Spreadsheet & SQL Basics",
            items: ["Excel fundamentals", "Basic SQL queries"],
            projects: ["Analyze a dataset with pivot tables and SQL queries"],
          },
          phase2: {
            title: "Phase 2 (1–2 months): Python & Visualization",
            items: [
              "Python (pandas)",
              "Data visualization (Matplotlib/Seaborn)",
            ],
            projects: ["Build a dashboard using PowerBI or Streamlit"],
          },
          phase3: {
            title: "Phase 3 (1–2 months): Advanced Analysis",
            items: [
              "Advanced SQL",
              "Statistical inference",
              "Feature engineering",
            ],
            projects: ["End-to-end analytics project with storytelling"],
          },
        };
        break;

      default:
        // Generic detailed roadmap built from PREDEFINED skills where possible
        const recommended = PREDEFINED[matchedKey];
        if (recommended) {
          roadmap = {
            phase1: {
              title: "Phase 1 (1–2 months): Basics",
              items: recommended.slice(0, 3),
            },
            phase2: {
              title: "Phase 2 (2 months): Core Tools",
              items: recommended.slice(3, 7),
            },
            phase3: {
              title: "Phase 3 (1–2 months): Projects & Apply",
              items: recommended.slice(7),
            },
          };
        } else {
          roadmap = {
            phase1: {
              title: "Phase 1 (1–2 months): Basics",
              items: ["Core fundamentals"],
            },
            phase2: {
              title: "Phase 2 (2 months): Intermediate",
              items: ["Build projects"],
            },
            phase3: {
              title: "Phase 3 (1–2 months): Finalize",
              items: ["Deploy & document"],
            },
          };
        }
    }

    return res.json({ role: targetRole, roadmap });
  } catch (err) {
    console.error("roadmap error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
const express = require("express");
const { PREDEFINED, findRoleKey } = require("../utils/predefinedRoles");

// POST /api/roadmap
// body: { targetRole: "Backend Developer" }
router.post("/", (req, res) => {
  try {
    const { targetRole } = req.body;
    if (!targetRole)
      return res.status(400).json({ error: "targetRole is required" });

    // find canonical role key (case-insensitive)
    const matchedKey = findRoleKey(targetRole);

    let roadmap = {};

    switch ((matchedKey || "").toLowerCase()) {
      case "backend developer":
        roadmap = {
          phase1: {
            title: "Phase 1 (1–2 months): Core Fundamentals",
            items: [
              "Language fundamentals (Java / Node.js)",
              "OOP and design patterns",
              "Version control with Git",
            ],
            resources: [
              "Official Java tutorials / Node.js docs",
              "Clean Code chapters on naming & functions",
            ],
            projects: ["CLI apps, small REST endpoints"],
            checkpoints: ["Implement CRUD API with tests"],
          },
          phase2: {
            title: "Phase 2 (2–3 months): Backend Stack & Databases",
            items: [
              "Web frameworks (Spring Boot or Express)",
              "Relational DBs (Postgres/MySQL) and ORMs",
              "REST API design, auth (JWT)",
              "Logging & error handling",
            ],
            resources: ["Spring guides / Express docs", "SQLBolt"],
            projects: ["Todo API with authentication, DB migrations"],
            checkpoints: [
              "Add user auth, role-based routes, and database tests",
            ],
          },
          phase3: {
            title: "Phase 3 (2 months): Production, Testing & System Design",
            items: [
              "Unit & integration testing (JUnit, Mocha)",
              "Containerization (Docker)",
              "Basic system design and scaling patterns",
              "CI/CD pipelines and monitoring basics",
            ],
            resources: ["Docker docs", "Testing libraries docs"],
            projects: [
              "Deploy API to cloud (Heroku/Render/AWS), add CI and health checks",
            ],
            checkpoints: [
              "Deployment with automatic tests and staging environment",
            ],
          },
          phase4: {
            title: "Phase 4 (ongoing): Advanced Topics",
            items: [
              "Performance tuning & caching (Redis)",
              "Distributed systems fundamentals",
              "Security hardening & observability",
            ],
            projects: ["Design a scalable microservice and benchmark it"],
          },
        };
        break;

      case "frontend developer":
        roadmap = {
          phase1: {
            title: "Phase 1 (1–2 months): Web Foundations",
            items: [
              "HTML semantics and accessibility (a11y)",
              "Modern CSS (Flexbox, Grid), responsive layouts",
              "Vanilla JavaScript (ES6+)",
            ],
            resources: ["MDN Web Docs", "A11y guidelines"],
            projects: ["Landing pages, responsive components"],
            checkpoints: ["Build accessible responsive page"],
          },
          phase2: {
            title: "Phase 2 (2 months): Frameworks & State",
            items: [
              "React fundamentals and hooks",
              "Routing, state management (Context/Redux)",
              "Component design & testing (Jest, RTL)",
            ],
            resources: ["React docs", "Testing Library docs"],
            projects: ["SPA with routing, auth, and forms"],
            checkpoints: ["Add unit/integration tests and CI"],
          },
          phase3: {
            title: "Phase 3 (1–2 months): Performance & Production",
            items: [
              "Performance optimization (code-splitting)",
              "Accessibility & SEO basics",
              "Deployment & CDN usage",
            ],
            resources: ["Lighthouse", "Web Vitals docs"],
            projects: ["Deploy performant portfolio and measure metrics"],
            checkpoints: ["Achieve good Lighthouse scores"],
          },
          phase4: {
            title: "Phase 4: Advanced Topics",
            items: [
              "Design systems",
              "TypeScript adoption",
              "Progressive Web Apps",
            ],
          },
        };
        break;

      case "full stack developer":
        roadmap = {
          phase1: {
            title: "Phase 1 (1–2 months): Fundamentals (Frontend + Backend)",
            items: [
              "HTML/CSS/JS basics",
              "Language fundamentals for backend (Node.js or Java)",
              "Git and collaboration workflows",
            ],
            projects: ["Static site + simple API endpoint"],
          },
          phase2: {
            title: "Phase 2 (2–3 months): Build Full Stack Apps",
            items: [
              "Frontend framework (React) + routing",
              "Backend framework (Express/Spring) + DB",
              "RESTful APIs and authentication",
            ],
            projects: [
              "Full stack app with login, CRUD, and a dashboard (deployed)",
            ],
            checkpoints: ["End-to-end integration tests and CI/CD"],
          },
          phase3: {
            title: "Phase 3 (2 months): Deploy, Scale & Security",
            items: [
              "Dockerize apps, use managed DB, setup CI/CD",
              "Add monitoring, logging, and secrets management",
              "Basic scaling and caching strategies",
            ],
            projects: ["Deploy production-ready app, add load testing"],
          },
          phase4: {
            title: "Phase 4: Portfolio & Interview Prep",
            items: [
              "Polish projects, write READMEs",
              "Study system design basics",
            ],
          },
        };
        break;

      case "devops engineer":
        roadmap = {
          phase1: {
            title: "Phase 1 (1–2 months): Foundations",
            items: [
              "Linux fundamentals and shell scripting",
              "Networking basics (DNS, HTTP, TLS)",
              "Version control and Git workflows",
            ],
            resources: ["Linux Handbook", "Networking for Devs"],
            checkpoints: ["Automate simple tasks with bash/python"],
          },
          phase2: {
            title: "Phase 2 (2 months): Containerization & CI/CD",
            items: [
              "Docker and images, multi-stage builds",
              "Container orchestration (Kubernetes basics)",
              "CI/CD pipelines (GitHub Actions / Jenkins)",
            ],
            projects: [
              "CI pipeline that builds, tests, and deploys containers",
            ],
            checkpoints: ["Create Helm chart and deploy to k8s cluster"],
          },
          phase3: {
            title: "Phase 3 (2 months): Cloud & Infra as Code",
            items: [
              "Cloud fundamentals (AWS/GCP/Azure)",
              "IaC (Terraform/Bicep)",
              "Monitoring and observability (Prometheus/Grafana)",
            ],
            projects: ["Provision infra with Terraform and deploy app"],
            checkpoints: ["Setup alerting and incident runbooks"],
          },
          phase4: {
            title: "Phase 4: Security & Reliability",
            items: ["Secrets management", "Chaos testing", "SRE practices"],
          },
        };
        break;

      case "data analyst":
        roadmap = {
          phase1: {
            title: "Phase 1 (1 month): Spreadsheet & SQL Basics",
            items: ["Excel fundamentals", "Basic SQL queries"],
            projects: ["Analyze a dataset with pivot tables and SQL queries"],
          },
          phase2: {
            title: "Phase 2 (1–2 months): Python & Visualization",
            items: [
              "Python (pandas)",
              "Data visualization (Matplotlib/Seaborn)",
            ],
            projects: ["Build a dashboard using PowerBI or Streamlit"],
          },
          phase3: {
            title: "Phase 3 (1–2 months): Advanced Analysis",
            items: [
              "Advanced SQL",
              "Statistical inference",
              "Feature engineering",
            ],
            projects: ["End-to-end analytics project with storytelling"],
          },
        };
        break;

      default:
        // Generic detailed roadmap built from PREDEFINED skills where possible
        const recommended = PREDEFINED[matchedKey];
        if (recommended) {
          roadmap = {
            phase1: {
              title: "Phase 1 (1–2 months): Basics",
              items: recommended.slice(0, 3),
            },
            phase2: {
              title: "Phase 2 (2 months): Core Tools",
              items: recommended.slice(3, 7),
            },
            phase3: {
              title: "Phase 3 (1–2 months): Projects & Apply",
              items: recommended.slice(7),
            },
          };
        } else {
          roadmap = {
            phase1: {
              title: "Phase 1 (1–2 months): Basics",
              items: ["Core fundamentals"],
            },
            phase2: {
              title: "Phase 2 (2 months): Intermediate",
              items: ["Build projects"],
            },
            phase3: {
              title: "Phase 3 (1–2 months): Finalize",
              items: ["Deploy & document"],
            },
          };
        }
    }

    return res.json({ role: targetRole, roadmap });
  } catch (err) {
    console.error("roadmap error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
