// client/src/TestAuth.jsx
import React, { useState, useEffect } from "react";

export default function TestAuth() {
  const [base, setBase] = useState(""); // để trống nếu đã proxy /api sang server
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("password");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [hello, setHello] = useState("");
  const [log, setLog] = useState("");

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const api = (p) => (base ? `${base}${p}` : p);

  async function login() {
    setLog("Logging in...");
    try {
      const res = await fetch(api("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || res.statusText);
      setToken(data.token);
      setLog("Login OK");
    } catch (e) { setLog("Login FAIL: " + e.message); }
  }

  async function callHello() {
    setLog("Calling /api/auth/hello...");
    try {
      const res = await fetch(api("/api/auth/hello"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || res.statusText);
      setHello(JSON.stringify(data, null, 2));
      setLog("Hello OK");
    } catch (e) { setHello(""); setLog("Hello FAIL: " + e.message); }
  }

  async function logout() {
    setLog("Logging out...");
    try {
      const res = await fetch(api("/api/auth/logout"), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || res.statusText);
      setLog("Logout OK");
    } catch (e) { setLog("Logout FAIL: " + e.message); }
    finally { setToken(""); setHello(""); }
  }

  return (
    <div style={{ maxWidth: 520, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
      <h2>JWT Auth Tester</h2>

      <div style={{ marginBottom: 12, padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
        <label style={{ display: "block", fontSize: 12, color: "#666" }}>
          Base URL (để trống nếu client đã proxy /api; nếu chưa, nhập http://localhost:5000)
        </label>
        <input
          value={base}
          onChange={(e) => setBase(e.target.value)}
          placeholder="http://localhost:5000 (hoặc để trống)"
          style={{ width: "100%", padding: 8, marginTop: 6 }}
        />
      </div>

      <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr", marginBottom: 12 }}>
        <div>
          <label style={{ display: "block", fontSize: 12, color: "#666" }}>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 12, color: "#666" }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={login}>Login</button>
        <button onClick={callHello} disabled={!token}>Call /hello</button>
        <button onClick={logout} disabled={!token}>Logout</button>
      </div>

      <div style={{ fontSize: 12, color: "#444", marginBottom: 8 }}>
        <b>Token:</b> {token ? token.slice(0, 32) + "..." : "(chưa có)"}
      </div>

      <pre style={{ background: "#f7f7f7", padding: 12, borderRadius: 8, minHeight: 80 }}>
        {hello || "(response sẽ hiện ở đây)"}
      </pre>

      <div style={{ color: "#888", marginTop: 8 }}>Log: {log}</div>
    </div>
  );
}
