const Feedback = require("../models/feedbackModel");

// Controller to fetch all feedback
const getFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find(); // Fetch from MongoDB
    res.json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedback", error });
  }
};

// Controller to submit feedback
const addFeedback = async (req, res) => {
  const { category, rating, comments } = req.body;

  if (!category || !rating || !comments) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newFeedback = new Feedback({
      category,
      rating,
      comments,
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ message: "Failed to save feedback", error });
  }
};

module.exports = { getFeedback, addFeedback };
