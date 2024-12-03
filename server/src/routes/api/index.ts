import express from "express";
import nameCocktailRoutes from "./nameCocktailRoutes"
import ingredientCocktailRoutes from "./nameCocktailRoutes";

const router = express.Router();

router.use("/nameCocktail", nameCocktailRoutes);
router.use("/ingredientCocktail", ingredientCocktailRoutes);

export default router;
