import express from "express";
import purchaseHistory from "../../Models/PurchaseHistory.js";
import BeatsCollections from "../../Models/Beats.js";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import dotenv from "dotenv";
import cartCollection from "../../Models/Cart.js";
import mongoose from "mongoose";
dotenv.config();

const router = express.Router();

const cashfree = new Cashfree(
  CFEnvironment.PRODUCTION,
  process.env.CASHFREE_APPID,
  process.env.CASHFREE_SECRET_KEY
);

router.post("/verify", async (req, res) => {
  const { orderId, itemsId } = req.body;
  try {
    const response = await cashfree.PGFetchOrder(orderId);
    if (response.data.order_status !== "PAID")
      return res
        .status(400)
        .json({ message: "Payment Cancelled!", type: "error" });
 
    const {
      customer_details,
      order_status,
      order_amount,
      order_id,
      created_at,
    } = response.data;
    const purchase = await purchaseHistory.create({
      userId: customer_details.customer_id,
      orderId: order_id,
      beats: itemsId,
      purchaseDate: created_at,
      status: order_status,
      purchaseAmmount: order_amount,
    });
 const beatIds = itemsId.map(id => new mongoose.Types.ObjectId(id));     
    const beat = await BeatsCollections.updateMany(
      { _id: { $in: beatIds } },
      { $set: { isPurchased: true } }
      
    );
    const cart = await cartCollection.deleteOne({
      userId: customer_details.customer_id,
    });
    
    return res
      .status(200)
      .json({ data: response.data, redirectUrl: "/mypurchase" });
  } catch (error) {
    console.error("Error verifying order:", error);

    return res.status(400).json({ message: error.response.data.message });
  }
});

export default router;
