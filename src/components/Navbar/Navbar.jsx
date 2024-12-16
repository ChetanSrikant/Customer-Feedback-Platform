import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear the user state
    navigate("/"); // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/icon.png" alt="Logo" />
        <h1>Feedback Platform</h1>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">Hello, {user.name}</span>
            <button className="navbar-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/" className="navbar-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
