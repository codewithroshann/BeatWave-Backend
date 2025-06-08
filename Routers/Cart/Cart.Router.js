import express from "express";
import jwt from "jsonwebtoken";
import User from "../../Models/User.js";
import cartCollection from "../../Models/Cart.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/cart", async (req, res) => {
  const token = req.cookies.token;
    if (!token || token === "")
    return res
      .status(400)
      .json({ message: "First Login To Access Cart!", type: "error" });
  const cookie = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user = await User.findOne({ _id: cookie.id });
    if (!user)
      return res
        .status(400)
        .json({ message: "User Not Found!", type: "error" });
    const cart = await cartCollection.findOne({ userId: cookie.id });
    if (!cart)
      return res
        .status(400)
        .json({ message: "Cart Not Found!", type: "error" });
    const beats = await cart.populate("beats");
    if (!beats) {
      return res.status(400).json({ message: "Empty Cart!", type: "error" });
    }
    return res.status(200).json({ beats: beats });
  } catch (error) {
    console.log(error);
  }
});

export default router;
