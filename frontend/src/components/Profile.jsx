import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Profile({ onClose }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        if (!mounted) return;
        setProfile(res.data.user || null);
      } catch (err) {
        console.error(err);
        setProfile(null);
      }
      setLoading(false);
    };
    fetchProfile();
    return () => (mounted = false);
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && profile && (
        <div>
          <div>
            <strong>Name:</strong> {profile.name || "-"}
          </div>
          <div>
            <strong>Email:</strong> {profile.email}
          </div>
          <div style={{ marginTop: 8 }}>
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
      {!loading && !profile && (
        <div>
          <div>Unable to load profile.</div>
          <div style={{ marginTop: 8 }}>
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
