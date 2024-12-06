import express from "express";
import authenticationRoutes from "./authentication.js";
import drinkRoutes from "./drinks/index.js";

const router = express.Router();

router.use("/", authenticationRoutes);
router.use("/drinks", drinkRoutes);

export default router;
