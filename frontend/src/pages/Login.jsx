import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function Login({ onSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const data = await login(email, password);
      localStorage.setItem("token", data.access_token);

      if (onSuccess) {
        onSuccess();
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="auth-box">
        <div className="modern-auth-header">
          <h2>Welcome Back</h2>
          <p>Log in to continue your growth journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="modern-auth-form">
          <div className="modern-form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="modern-form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="modern-error">{error}</p>}

          <button type="submit" disabled={loading} className="modern-primary-btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}