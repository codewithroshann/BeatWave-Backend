import express from "express";
import bcrypt from "bcrypt";
import User from "../../Models/User.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if (!findUser) return res.status(400).json({ message: "User not found" });
    bcrypt
      .compare(password, findUser.password)
      .then(function (result) {
        if (result) {
          const token = jwt.sign(
            {
              id: findUser._id,
              email: findUser.email,
              password: findUser.password,
              phone: findUser.phone,
              fullName: findUser.fullName,
              gender: findUser.gender,
              role: findUser.role,
              date: findUser.data,
            },
            "rock444"
          );
          res.cookie("token", token, {
            httpOnly: true, // still recommended for security
            secure: false, // allow over HTTP (only for development)
            sameSite: "lax", // can also use 'strict' or 'none'
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
          });
          const cookie = jwt.verify(token, "rock444");
          return res.status(200).json({
            redirectUrl: "/",
            message: "Login Successfully!",
            type: "success",
            user: cookie,
          });
        } else {
          return res.status(400).json({ message: "Invalid Credentials" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ message: "something went wrong" });
      });
  } catch (error) {
    return res.status(500).json({ message: " OOPS! something went wrong" });
  }
});

export default router;
