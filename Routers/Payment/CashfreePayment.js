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

function getOrderid() {
  const uniqueId = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256");
  hash.update(uniqueId);
  const orderId = hash.digest("hex");
  return orderId.substr(0, 12);
}

router.post("/payment", async (req, res) => {
  const token = req.cookies.token;
 const {id,phone,fullName,email}= req.body.userData
 const {price} = req.body
  const phoneNum = phone.toString()
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized LogIn First!",
      type: "error",
      redirectUrl: "/auth/user/login",
    });
  }
  try {
    let request = {
      order_amount: price,
      order_currency: "INR",
      order_id: await getOrderid(),
      customer_details: {
        customer_id: id,
        customer_phone: phoneNum,
        customer_name: fullName,
        customer_email: email,
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
