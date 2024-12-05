import express from "express";
import nameCocktailRoutes from "./nameCocktailRoutes.js";
import ingredientCocktailRoutes from "./nameCocktailRoutes.js";
import userRoutes from "./user/index.js";

const router = express.Router();

router.use("/nameCocktail", nameCocktailRoutes);
router.use("/ingredientCocktail", ingredientCocktailRoutes);
router.use("/user", userRoutes);

export default router;
