import { useState, useEffect } from "react";
import { api } from "../services/api";
import Loader from "./Loader";

export default function SkillGap() {
  const [targetRole, setTargetRole] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchRoles = async () => {
      try {
        const res = await api.get("/roles");
        const data = res.data;
        if (!mounted) return;
        if (Array.isArray(data)) setRoles(data);
        else if (data && Array.isArray(data.roles)) setRoles(data.roles);
      } catch (err) {
        // ignore
      }
    };
    fetchRoles();
    return () => (mounted = false);
  }, []);

  const handleAnalyze = async () => {
    if (!targetRole.trim()) return alert("Enter a role");

    setLoading(true);
    setResult(null);

    try {
      const res = await api.post("/skill-gap", {
        targetRole,
        currentSkills: skills.split(",").map((s) => s.trim()),
      });
      setResult(res.data);
    } catch (err) {
      alert("Error analyzing skills");
    }

    setLoading(false);
  };

  return (
    <div>
      <div>
        <label className="block text-sm mb-1 muted">Select target role</label>
        <select
          className="form-input text-black mb-3"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
        >
          <option className="text-black" value="">-- pick a role --</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <label className="block text-sm mb-1 muted">
          Your skills (comma separated)
        </label>
        <textarea
          placeholder="e.g. JavaScript, Git, SQL"
          className="form-textarea mb-3"
          rows={3}
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <button onClick={handleAnalyze} className="btn-primary w-full">
          Analyze Skill Gap
        </button>
      </div>

      {loading && <Loader />}

      {result && (
        <div className="mt-4">
          {/* skill knowledge percentage */}
          {(() => {
            const known = Array.isArray(result.matchedSkills)
              ? result.matchedSkills.length
              : 0;
            const missing = Array.isArray(result.missingSkills)
              ? result.missingSkills.length
              : 0;
            const total = known + missing;
            const percent = total > 0 ? Math.round((known / total) * 100) : 0;
            return (
              <div className="mb-3">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <div style={{ fontWeight: 700 }}>Skill coverage</div>
                  <div className="muted">{percent}%</div>
                </div>
                <div className="progress-outer">
                  <div
                    className="progress-inner"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
                  {known} of {total} skills
                </div>
              </div>
            );
          })()}
          <h3 className="font-semibold mb-2">Missing Skills:</h3>
          <ul className="list-disc ml-5">
            {result.missingSkills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h3 className="font-semibold mt-3">Recommendations:</h3>
          <ul className="list-disc ml-5">
            {result.recommendations.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
