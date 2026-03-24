import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (password.length > 50) {
      setMessage("Password is too long. Please use 50 characters or fewer.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await register(email, password);
      setMessage("Account created successfully.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setMessage(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="auth-box">
        <div className="modern-auth-header">
          <h2>Create Account</h2>
          <p>Start building better habits and a stronger mindset.</p>
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
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="modern-form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {message && (
            <p className={message.includes("successfully") ? "modern-success" : "modern-error"}>
              {message}
            </p>
          )}

          <button type="submit" disabled={loading} className="modern-primary-btn">
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}