import express from "express";
import authenticationRoutes from "./authentication.js";
import drinkRoutes from "./drinks/index.js";
import {User} from "../../../models/index.js";
import jwt, { JwtPayload } from "jsonwebtoken";

const router = express.Router();

router.use("/", authenticationRoutes);
router.use("/drinks", drinkRoutes);

router.get("/:token", async (req, res) => {
    const { token } = req.params;
    const jwtSecret: any = process.env.JWT_SECRET;
    try {
      const tokenData = <JwtPayload>jwt.verify(token, jwtSecret);
      const user = await User.findById(tokenData.userId).populate("drinks");
      return res.json(user)
    } catch (error) {
        return res.status(401).send();
    }
})

export default router;
