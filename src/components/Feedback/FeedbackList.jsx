import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeedbackList.css";

const FeedbackList = () => {
  const [feedback, setFeedback] = useState([]); // State to hold feedback data
  const [loading, setLoading] = useState(true); // State to show loading spinner
  const [error, setError] = useState(null); // State to hold error messages

  // Fetch feedback from the backend
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback");
        setFeedback(response.data); // Store feedback data in state
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        setError("Failed to fetch feedback.");
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []); // Empty dependency array ensures this runs only once when the component loads

  if (loading) return <p>Loading...</p>; // Show a loading spinner or message
  if (error) return <p className="error">{error}</p>; // Show error message if API call fails

  return (
    <div className="feedback-list">
      <h2>Feedback Summary</h2>
      {feedback.length === 0 ? (
        <p>No feedback available. Be the first to submit!</p>
      ) : (
        feedback.map((item) => (
          <div className="feedback-card" key={item._id}> {/* Use MongoDB's _id */}
            <h3>{item.category}</h3>
            <p><strong>Rating:</strong> {item.rating}</p>
            <p><strong>Comments:</strong> {item.comments}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackList;
