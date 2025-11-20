import { useState, useEffect } from "react";
import { api } from "../services/api";
import Loader from "./Loader";

export default function Roadmap() {
  const [role, setRole] = useState("");
  const [roadmap, setRoadmap] = useState(null);
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
        // ignore — roles list is optional
      }
    };
    fetchRoles();
    return () => (mounted = false);
  }, []);

  const fetchRoadmap = async () => {
    if (!role.trim()) return alert("Enter a role");

    setLoading(true);
    setRoadmap(null);

    try {
      const res = await api.post("/roadmap", { targetRole: role });
      setRoadmap(res.data.roadmap);
    } catch (err) {
      alert("Error loading roadmap");
    }

    setLoading(false);
  };

  return (
    <div>
      <div>
        <label className="block text-sm mb-1 muted">Select target role</label>
        <select
          className="form-input mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">-- pick a role --</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button onClick={fetchRoadmap} className="btn-primary w-full">
          Generate Roadmap
        </button>

        {loading && <Loader />}

        {roadmap && (
          <div className="mt-4 space-y-3">
            {Object.keys(roadmap).map((phase, idx) => (
              <div key={idx} className="card">
                <h3 className="font-semibold">{roadmap[phase].title}</h3>
                <ul className="list-disc ml-5 mt-1">
                  {roadmap[phase].items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
