import express from "express";
import crypto from "crypto";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.CASHFREE_APPID,
  process.env.CASHFREE_SECRET
);

function getOrderid() {
  const uniqueId = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256");
  hash.update(uniqueId);
  const orderId = hash.digest("hex");
  return orderId.substr(0, 12);
}

router.get("/payment", async (req, res) => {
  try {
    let request = {
      order_amount: 1,
      order_currency: "INR",
      order_id: await getOrderid(),
      customer_details: {
        customer_id: "walterwNrcMi",
        customer_phone: "9999999999",
        customer_name: "rock444",
        customer_email: "rock@rock.com",
      },
    };
    cashfree
      .PGCreateOrder(request)
      .then((response) => {
        return res.status(200).json(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
});

export default router;
