import express from "express"
import jwt from "jsonwebtoken";
import cartCollection from "../../Models/Cart.js";
import dotenv from "dotenv"

dotenv.config()

const router = express.Router();

router.get("/check-auth", async (req, res) => {
    const token = req.cookies.token;
    
    if (token == "" || !token) return res.status(200).json({ isLogedIn: false });
    try {
      const cookie = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      const cart = await cartCollection.findOne({ userId: cookie.id });
      if (!cart)
        return res.status(200).json({ isLogedIn: true, user: cookie, cart: [] });
      return res.json({
        isLogedIn: true,
        user: cookie,
        cart: cart.beats,
      });
    } catch (error) {
      return res.status(200).json({ isLogedIn: false });
    }
  });

  export default router