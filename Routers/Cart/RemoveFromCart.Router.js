import express from "express"
import cartCollection from "../../Models/Cart.js";
import jwt from "jsonwebtoken";
import islogedIn from "../../Middleware/UserAuthentication.js";
import dotenv from "dotenv"

dotenv.config()
const router = express.Router();
router.delete("/:id",islogedIn, async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "Beat Not Found!" });
      const token = req.cookies.token;
      if (!token)
        return res
          .status(400)
          .json({ message: "First Login To Access Cart!", type: "error" });
  
      const cookie = jwt.verify(token, process.env.JWT_SECRET);
      const updatedCart = await cartCollection.findOneAndUpdate(
        { userId: cookie.id },
        { $pull: { beats: id } }, // remove beatId from 'beats' array
        { new: true }
      );
      if (!updatedCart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      return res
        .status(200)
        .json({ message: "Beat removed from cart", type: "success" });
    } catch (error) {
      console.log(error);
    }
  });

  export default router