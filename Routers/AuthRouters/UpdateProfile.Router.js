import express from "express";
import jwt from "jsonwebtoken";
import User from "../../Models/User.js";
import islogedIn from "../../Middleware/UserAuthentication.js";
const router = express.Router();

router.post("/update-profile",islogedIn, async (req, res) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(400)
      .json({ message: "First Login To Access!", type: "error" });
  const { phone, gender, name } = req.body;
  const cookie = jwt.verify(token, "rock444");
  const updatedCookie = { ...cookie, gender, phone, fullName: name };
  const newToken = jwt.sign(updatedCookie, "rock444");
  const existingUser = await User.findOne({ phone: phone });
  console.log(existingUser);
  if (existingUser) {
    if (existingUser._id != cookie.id)
      return res
        .status(400)
        .json({ message: "Phone number already exist", type: "warning" });
  }
  const UpdatedUser = await User.findOneAndUpdate(
    { _id: cookie.id },
    { fullName: name, phone: phone, gender: gender }
  );
  res.cookie("token", newToken, {
    httpOnly: true, // still recommended for security
    secure: false, // allow over HTTP (only for development)
    sameSite: "lax", // can also use 'strict' or 'none'
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  });
  return res.status(200).json({
    message: "Profile Updated Successfully!",
    type: "success",
    user: UpdatedUser,
  });
});

export default router;
