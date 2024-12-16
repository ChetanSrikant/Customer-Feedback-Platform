const express = require('express');
const { OAuth2Client } = require('google-auth-library');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google authentication endpoint
router.post('/auth/google', async (req, res) => {
  const { token } = req.body;  // Google token from the frontend

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Check if the client ID matches
    });

    // Get user information from the payload
    const payload = ticket.getPayload();
    const { name, email, picture } = payload;

    // Optionally, save the user data to your database (if necessary)

    res.status(200).json({ name, email, picture });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(401).json({ message: 'Invalid Google token' });
  }
});

module.exports = router;
