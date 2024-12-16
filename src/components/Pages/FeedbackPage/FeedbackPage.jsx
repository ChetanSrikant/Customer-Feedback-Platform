import React from "react";
import FeedbackForm from "../../Feedback/FeedbackForm";
// import "./FeedbackFormPage.css";

const FeedbackFormPage = () => {
  return (
    <div className="feedback-form-page">
      <h1>Submit Feedback</h1>
      <p>Your feedback is important to us. Please let us know your thoughts!</p>
      <FeedbackForm />
    </div>
  );
};

export default FeedbackFormPage;
