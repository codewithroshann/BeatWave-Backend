import express from "express";
import bcrypt from "bcrypt"
import User from "../../Models/User.js"

const router = express.Router();

router.post("/user/signup", async (req, res) => {
    try {
        const { fullName, email, phone, password, gender } = req.body;
        const findUserEmail = await User.findOne({ email: email });
        if (findUserEmail)
          return res.status(400).json({ message: "Email already exist" });
        const findUserNumber = await User.findOne({ phone: phone });
        if (findUserNumber)
          return res.status(400).json({ message: "Number already exist" });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, async function (err, hash) {
            const user = await User.create({
              fullName: fullName,
              email: email,
              phone: phone,
              password: hash,
              gender: gender,
            });
          });
        });
        res.status(200).json({
          message: "User created successfully",
        type:"success",
          redirectUrl: "http://localhost:3000/auth/user/login",
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
      }
})

export default router