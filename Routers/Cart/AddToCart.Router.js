import express from 'express'
import BeatsCollection from '../../Models/Beats.js';
import jwt from 'jsonwebtoken';
import cartCollection from '../../Models/Cart.js';
import islogedIn from '../../Middleware/UserAuthentication.js';

const router = express.Router();


router.post("/:id",islogedIn, async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.token;
    try {
      const beat = await BeatsCollection.findOne({ _id: id });
      if (!beat) {
        return res.status(400).json({ message: "Beat Not Found!" });
      }
      const cookie = jwt.verify(token, "rock444");
      if (!cookie) {
        return res.status(400).json({ message: "User Not Found!" });
      }
      const cart = await cartCollection.findOne({ userId: cookie.id });
      if (cart) {
        if (!cart.beats.includes(beat._id)) {
          cart.beats.push(beat._id);
          await cart.save();
          return res.status(200).json({
            message: "Beat Added To Cart Successfully!",
            type: "success",
          });
        } else {
          return res
            .status(200)
            .json({ message: "Beat Already Added To Cart!", type: "warning" });
        }
      }
      if (!cart) {
        const newCart = await cartCollection.create({
          userId: cookie.id,
          beats: [beat._id],
        });
        await newCart.save();
        return res.status(200).json({
          message: "Beat Added To Cart Successfully!",
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  export default router 