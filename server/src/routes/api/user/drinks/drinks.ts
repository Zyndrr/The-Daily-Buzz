import { Router } from "express";
import { Drink, User } from "../../../../models/index.js";
import jwt, { JwtPayload } from "jsonwebtoken";

const router = Router();

router.post("/", async (req, res) => {
  if (!req.body.token) res.status(401).send();
  const token = req.body.token;
  const jwtSecret: any = process.env.JWT_SECRET;
  try {
    const tokenData = <JwtPayload>jwt.verify(token, jwtSecret);
    const user = await User.findById(tokenData.userId);
    if (!user) {
      res.status(401).send();
      return;
    }
    let drink = null;
    drink = await Drink.findOne({ ...req.body.drink });
    if (!drink) {
      drink = await Drink.create(req.body.drink);
    }
    user.drinks.push(drink.id);
    user.save();
    return res.status(200).send();
  } catch (error) {
    return res.status(401).send();
  }
});

router.delete("/", async (req, res) => {
  if (!req.body.token) res.status(401).send();
  const token = req.body.token;
  const jwtSecret: any = process.env.JWT_SECRET;
  try {
    const tokenData = <JwtPayload>jwt.verify(token, jwtSecret);
    await User.findByIdAndUpdate(
      { _id: tokenData.userId },
      { $set: { drinks: [] } }
    );
    return res.status(200).send();
  } catch (error) {
    return res.status(401).send();
  }
});

router.delete("/:drinkId", async (req, res) => {
  if (!req.body.token) res.status(401).send();
  const token = req.body.token;
  const jwtSecret: any = process.env.JWT_SECRET;
  try {
    const tokenData = <JwtPayload>jwt.verify(token, jwtSecret);
    await User.findByIdAndUpdate(
      { _id: tokenData.userId },
      { $pull: { drinks: req.params.drinkId } }
    );
    return res.status(200).send();
  } catch (error) {
    return res.status(401).send();
  }
});

router.patch("/menu", async (req, res) => {
  if (!req.body.token) res.status(401).send();
  const token = req.body.token;
  const jwtSecret: any = process.env.JWT_SECRET;
  try {
    const tokenData = <JwtPayload>jwt.verify(token, jwtSecret);
    await User.findByIdAndUpdate(
      { _id: tokenData.userId },
      { $set: { menuName: req.body.menuName } }
    );
    return res.status(200).send();
  } catch (error) {
    return res.status(401).send();
  }
});

export default router;
