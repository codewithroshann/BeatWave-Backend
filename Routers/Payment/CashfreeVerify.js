import express from "express";
import crypto from "crypto";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const cashfree = new Cashfree(
    CFEnvironment.SANDBOX,
    process.env.CASHFREE_APPID,
    process.env.CASHFREE_SECRET_KEY
  );


router.post("/verify", async (req, res) => {
  const { orderId } = req.body;
  try {
    const response = await cashfree.PGFetchOrder(orderId);
       return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error verifying order:", error);

    return res.status(400).json({ message: error.response.data.message });
  }
});

export default router;
