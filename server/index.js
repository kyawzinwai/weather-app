require('dotenv').config();

const express = require("express");
const axios = require("axios");
const morgan = require("morgan");
const cors = require("cors"); // Import the 'cors' middleware

const app = express();
const port = process.env.PORT || 3100;

function inputIsMalicious(input) {
  // Check for potential SQL injection
  const maliciousPatterns = [/SELECT.*FROM/, /DROP TABLE/, /--/];
  for (const pattern of maliciousPatterns) {
    if (pattern.test(input)) {
      return true;
    }
  }
  return false;
}

// Middleware for logging
app.use(morgan("dev"));

// Middleware for JSON parsing
app.use(express.json());

// Configure CORS settings
app.use(cors());

// Custom middleware for security check
app.use((req, res, next) => {
  // Get the ZIP code from the request body or query parameters
  const zipCode = req.query.zipcode;

  if (!zipCode) {
    return res.status(422).json({ message: "ZIP code is missing" });
  }

  // Check if the ZIP code is in a valid format
  const zipCodePattern = /^\d{5,6}$/; // Assumes a 6-digit ZIP code
  if (!zipCodePattern.test(zipCode)) {
    return res.status(403).json({ message: "Invalid ZIP code format" });
  }

  if (inputIsMalicious(req.body)) {
    return res.status(400).json({ message: "Bad Request" });
  } else {
    console.log("Security check passed");
  }
  next();
});

// Route for fetching weather data
app.get("/weather", async (req, res) => {
  try {
    const { zipcode } = req.query;
    const weatherStackApiKey = process.env.WEATHERSTACK_API_KEY;
    const response = await axios.get(
      `http://api.weatherstack.com/current?access_key=${weatherStackApiKey}&query=${zipcode},ho%20chi%20%minh`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
