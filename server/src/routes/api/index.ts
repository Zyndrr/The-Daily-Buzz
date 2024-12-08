import express from "express";
import nameCocktailRoutes from "./nameCocktailRoutes.js";
import ingredientCocktailRoutes from "./ingredientCocktailroutes.js";
import userRoutes from "./user/index.js";

const router = express.Router();

router.use("/", nameCocktailRoutes);
router.use("/", ingredientCocktailRoutes);
router.use("/user", userRoutes);

export default router;
