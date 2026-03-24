import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="navbar glass-nav">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          Life Coach
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/about" className="nav-btn">About</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="modern-primary-btn">Get Started</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="nav-btn">Dashboard</Link>
            <button onClick={handleLogout} className="modern-secondary-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}