import { Router } from 'express';
import axios from 'axios';

const router = Router();

// Ninja Cocktail API URL
const RAPIDAPI_URL = "https://api.api-ninjas.com/v1/cocktail";

// Set your API Key here
const API_KEY = process.env.RAPIDAPI_KEY;  // Store it in your .env file

// Route to search cocktails by name
router.get('/searchByName/:cocktailName', async (req, res) => {
  const { cocktailName } = req.params;

  try {
    // Make the GET request to the Ninja Cocktail API to search by name
    const response = await axios.get(RAPIDAPI_URL, {
      headers: {
        'X-Api-Key': API_KEY,  // Pass the API key in the headers
      },
      params: {
        name: cocktailName,  // Searching by cocktail name
      },
    });

    // If cocktails were found, send them back as the response
    if (response.data && response.data.length > 0) {
      const cocktails = response.data.map((cocktail: any) => ({
        name: cocktail.name,
        ingredients: cocktail.ingredients,
        instructions: cocktail.instructions,
      }));
      res.json(cocktails);  // Send the cocktail data back to the client
    } else {
      res.status(404).json({ message: "No cocktails found" });
    }
  } catch (error) {
    console.error("Error fetching cocktail data:", error);
    res.status(500).json({ message: "Error fetching data from Cocktail API" });
  }
});

// Route to search cocktails by ingredient
router.get('/searchByIngredient/:ingredient', async (req, res) => {
  const { ingredient } = req.params;

  try {
    // Make the GET request to the Ninja Cocktail API to search by ingredient
    const response = await axios.get(RAPIDAPI_URL, {
      headers: {
        'X-Api-Key': API_KEY,  // Pass the API key in the headers
      },
      params: {
        ingredient: ingredient,  // Searching by ingredient
      },
    });

    // If cocktails were found, send them back as the response
    if (response.data && response.data.length > 0) {
      const cocktails = response.data.map((cocktail: any) => ({
        name: cocktail.name,
        ingredients: cocktail.ingredients,
        instructions: cocktail.instructions,
      }));
      res.json(cocktails.data);  // Send the cocktail data back to the client
    } else {
      res.status(404).json({ message: "No cocktails found" });
    }
  } catch (error) {
    console.error("Error fetching cocktail data:", error);
    res.status(500).json({ message: "Error fetching data from Cocktail API" });
  }
});

// Route to save cocktail to user's drink menu (Example placeholder)
router.post('/saveToMenu', async (req, res) => {
  const { username, cocktail } = req.body;  // Assume username and cocktail data are sent

  try {
    const user = await username.findById(username);
    if (user) {
      user.drinkMenu.push(cocktail);
      await user.save();
      res.status(200).json({ message: "Cocktail saved to menu" });
    } else {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Cocktail saved to menu (dummy response)" });  // Placeholder response
  } catch (error) {
    console.error("Error saving cocktail to menu:", error);
    res.status(500).json({ message: "Error saving cocktail to menu" });
  }
});

export default router;
