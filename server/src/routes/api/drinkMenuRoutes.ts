import express from "express";
import User from "../../models/user";

const router = express.Router();

// Route to save a cocktail to a user's drink menu
router.post("/:username/save", async (req, res) => {
  const { username } = req.params;
  const { drinks } = req.body;

  if (!drinks || !drinks.name || !drinks.ingredients) {
    return res.status(400).json({ error: "Cocktail data is incomplete." });
  }

  try {
    // Find the user and update their drink menu
    const user = await User.findById(username);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Add the cocktail to the user's drink menu
    user.drinkMenu.push(drinks);
    await user.save();

    res.json({ message: "Cocktail saved successfully!", drinkMenu: user.drinkMenu });
  } catch (error) {
    console.error("Error saving cocktail:", error);
    res.status(500).json({ error: "An error occurred while saving the cocktail." });
  }
});

export default router;
