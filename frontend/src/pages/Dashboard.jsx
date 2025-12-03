import SkillGap from "../components/SkillGap";
import Roadmap from "../components/Roadmap";
import News from "../components/News";
import Auth from "../components/Auth";

export default function Dashboard() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand">
          <div className="logo" />
          <div>
            <h1>Career Analyzer</h1>
            <p className="muted">Plan your growth. Land your dream role.</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Auth />
          <div className="muted">Updated: Nov 2025</div>
        </div>
      </header>

      <main className="main-grid">
        <div>
          <div className="card-grid">
            <div className="card">
              <div className="section-title">Skill Gap Analyzer</div>
              <SkillGap />
            </div>

            <div className="card">
              <div className="section-title">Career Roadmap</div>
              <Roadmap />
            </div>
          </div>
        </div>

        <aside>
          <div className="card">
            <div className="section-title text-orange-300">
              Latest Tech News
            </div>
            <News />
          </div>
        </aside>
      </main>
    </div>
  );
}
