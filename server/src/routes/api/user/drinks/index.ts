import express from "express";
import drinkRoutes from "./drinks.js";

const router = express.Router();

router.use("/", drinkRoutes);

export default router;
