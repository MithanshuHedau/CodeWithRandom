import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function Auth() {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState("login"); // 'login' or 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("authUser");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    // keep local state in sync (in case other tabs changed it)
    const onStorage = () => {
      try {
        const raw = localStorage.getItem("authUser");
        setUser(raw ? JSON.parse(raw) : null);
      } catch (e) {
        setUser(null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const saveSession = (token, user) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
    setUser(user);
  };

  const handleRegister = async () => {
    if (!email || !password) return alert("Email and password required");
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
      if (res.data && res.data.token) {
        saveSession(res.data.token, res.data.user || { email });
        setShowModal(false);
      }
    } catch (err) {
      alert(err?.response?.data?.error || "Registration failed");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    if (!email || !password) return alert("Email and password required");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data && res.data.token) {
        saveSession(res.data.token, res.data.user || { email });
        setShowModal(false);
      }
    } catch (err) {
      alert(err?.response?.data?.error || "Login failed");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
    setShowProfile(false);
  };

  // Button shown in header when logged out: opens modal
  if (!user) {
    return (
      <>
        <button
          className="btn"
          onClick={() => {
            setTab("login");
            setShowModal(true);
          }}
        >
          Login / Register
        </button>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <button
                    onClick={() => setTab("login")}
                    className={tab === "login" ? "tab-active" : "tab"}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setTab("register")}
                    className={tab === "register" ? "tab-active" : "tab"}
                  >
                    Register
                  </button>
                </div>
                <button
                  className="btn-ghost"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>

              {tab === "login" ? (
                <div style={{ marginTop: 12 }}>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    className="form-input mb-2"
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    type="password"
                    className="form-input mb-2"
                  />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      className="btn"
                      onClick={handleLogin}
                      disabled={loading}
                    >
                      Login
                    </button>
                    <button
                      className="btn-ghost"
                      onClick={() => setTab("register")}
                      disabled={loading}
                    >
                      Switch to Register
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: 12 }}>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="full name"
                    className="form-input mb-2"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    className="form-input mb-2"
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    type="password"
                    className="form-input mb-2"
                  />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      className="btn"
                      onClick={handleRegister}
                      disabled={loading}
                    >
                      Register
                    </button>
                    <button
                      className="btn-ghost"
                      onClick={() => setTab("login")}
                      disabled={loading}
                    >
                      Switch to Login
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  // When logged in show profile and logout buttons
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <button className="btn-ghost" onClick={() => setShowProfile(true)}>
        {user.name || user.email}
      </button>
      <button className="btn-ghost" onClick={handleLogout}>
        Logout
      </button>

      {showProfile && (
        <div className="modal-overlay">
          <div className="modal">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: 700 }}>Profile</div>
              <button
                className="btn-ghost"
                onClick={() => setShowProfile(false)}
              >
                Close
              </button>
            </div>
            <div style={{ marginTop: 12 }}>
              <div>
                <strong>Name:</strong> {user.name || "-"}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div style={{ marginTop: 8 }}>
                <button
                  className="btn"
                  onClick={() => {
                    setShowProfile(false);
                    window.location.href = "/";
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
