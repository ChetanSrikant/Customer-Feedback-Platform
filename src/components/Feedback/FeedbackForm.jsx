import React, { useState } from "react";
import axios from "axios";
import "./FeedbackForm.css";

const FeedbackForm = ({ addFeedback }) => {
  const [formData, setFormData] = useState({
    category: "Product Features",
    rating: "",
    comments: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5.";
    }
    if (!formData.comments.trim()) {
      newErrors.comments = "Comments cannot be empty.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Send the feedback data to the backend (MongoDB)
      const response = await axios.post("http://localhost:5000/api/feedback", formData);

      // On success, show a success message and reset the form
      setSuccessMessage("Feedback submitted successfully!");
      setFormData({
        category: "Product Features",
        rating: "",
        comments: "",
      });

      // Optionally, add the feedback to the list locally (if needed)
      addFeedback(response.data);

      setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
    } catch (error) {
      // Handle errors
      if (error.response) {
        setErrors({ submit: error.response.data.message });
      }
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>

      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option>Product Features</option>
          <option>Product Pricing</option>
          <option>Product Usability</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="rating">Rating (1-5):</label>
        <input
          id="rating"
          name="rating"
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
          required
        />
        {errors.rating && <p className="error">{errors.rating}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="comments">Comments:</label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          required
        />
        {errors.comments && <p className="error">{errors.comments}</p>}
      </div>

      <button type="submit">Submit</button>
      {successMessage && <p className="success">{successMessage}</p>}
      {errors.submit && <p className="error">{errors.submit}</p>}
    </form>
  );
};

export default FeedbackForm;
