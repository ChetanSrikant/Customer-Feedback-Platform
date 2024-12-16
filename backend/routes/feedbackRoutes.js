const express = require("express");
const { getFeedback, addFeedback } = require("../controllers/feedbackController");

const router = express.Router();

// Route to get all feedback
router.get("/feedback", getFeedback);

// Route to post feedback
router.post("/feedback", addFeedback);

module.exports = router;
