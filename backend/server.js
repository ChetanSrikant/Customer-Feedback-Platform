const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const feedbackRoutes = require("./routes/feedbackRoutes");
require("dotenv").config();


const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Update with your frontend URL
}));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use feedback routes
app.use("/api", feedbackRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
