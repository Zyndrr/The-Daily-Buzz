import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const router = express.Router();

// Configuration for the Ninja API
const API_HOST = "api.api-ninjas.com";
const API_KEY = process.env.RAPIDAPI_KEY; // Ensure your .env file has the RAPIDAPI_KEY variable

// Middleware to validate query parameters
router.get("/search-ingredients", async (req, res) => {
  console.log('IM HERE')
  const { query, type } = req.query;

  // Validate query parameters
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "The 'query' parameter is required and must be a string." });
  }
  if (!type || (type !== "ingredients" && type !== "name")) {
    return res
      .status(400)
      .json({ error: "The 'type' parameter is required and must be either 'ingredients' or 'name'." });
  }

  try {
    // Make the API call to Ninja API
    const response = await axios.get(`https://${API_HOST}/v1/cocktail`, {
      params: { [type]: query }, // Dynamically set the query type (name or ingredient)
      headers: {
        "X-Api-Key": API_KEY,
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
