import React from "react";
import FeedbackForm from "../../Feedback/FeedbackForm";
import FeedbackList from "../../Feedback/FeedbackList";
import "./Dashboard.css";

const Dashboard = ({ user, handleLogout }) => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name || "User"}!</h1>
        <p>Submit your feedback and see what others are saying.</p>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        {/* Feedback Form */}
        <div className="dashboard-section feedback-form-section">
          <h2>Submit Feedback</h2>
          <FeedbackForm />
        </div>

        {/* Feedback List */}
        <div className="dashboard-section feedback-list-section">
          <FeedbackList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
