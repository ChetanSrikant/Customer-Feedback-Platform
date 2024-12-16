import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom"; // Import useLocation to access the current route
import NavBar from "./components/Navbar/Navbar";
import LoginPage from "./components/Pages/Login/LoginPage";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import FeedbackFormPage from "./components/Pages/FeedbackPage/FeedbackPage";

const App = () => {
  // Initialize user state from local storage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Update local storage whenever the user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const location = useLocation(); // Get the current route

  return (
    <>
      {/* Only render the NavBar if we're not on the LoginPage */}
      {location.pathname !== "/" && <NavBar user={user} setUser={setUser} />}
      
      <Routes>
        <Route
          path="/"
          element={<LoginPage setUser={setUser} />}
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} setUser={setUser} />
            ) : (
              <p>Please log in to access the dashboard.</p>
            )
          }
        />
        <Route
          path="/feedback"
          element={
            user ? (
              <FeedbackFormPage />
            ) : (
              <p>Please log in to submit feedback.</p>
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
