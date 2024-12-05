import { Router } from "express";
import apiRoutes from "./api/index.js";
//TODO: import your routes

const router = Router();

router.use("/api", apiRoutes);

export default router;
