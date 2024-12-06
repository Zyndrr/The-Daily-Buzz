import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const router = express.Router();

// Configuration for the Ninja API
const API_HOST = "cocktail-by-api-ninjas.p.rapidapi.com";
const API_KEY = process.env.RAPIDAPI_KEY; // Ensure your .env file has the RAPIDAPI_KEY variable

// Middleware to validate query parameters
router.get("/search", async (req, res) => {
  const { query, type } = req.query;

  // Validate query parameters
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "The 'query' parameter is required and must be a string." });
  }
  if (!type || (type !== "name")) {
    return res
      .status(400)
      .json({ error: "The 'type' parameter is required and must be either 'name' or 'ingredient'." });
  }

  try {
    // Make the API call to Ninja API
    const response = await axios.get(`https://${API_HOST}/v1/cocktail`, {
      params: { [type]: query }, // Dynamically set the query type (name or ingredient)
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    });

    // Send the API response data back to the client
    return res.json(response.data);
  } catch (error) {
    console.error("Error calling Ninja API:", error);

    // Handle known errors from the API or unknown errors
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data || "Failed to fetch data from the Ninja API.";
      return res.status(status).json({ error: message });
    }

    return res.status(500).json({ error: "An unexpected error occurred." });
  }
});

export default router;
