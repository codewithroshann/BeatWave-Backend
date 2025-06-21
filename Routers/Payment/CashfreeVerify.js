import express from "express";
import crypto from "crypto";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/verify", async(req, res) => {
try {
    const {orderId} = req.body
    console.log(orderId,"kgfkglfk")
    

} catch (error) {
    
}


})


export default router