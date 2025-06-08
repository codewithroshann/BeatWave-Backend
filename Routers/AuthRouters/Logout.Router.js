import express from "express";
const router = express.Router();
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/", // Always include the path if you set it (default is "/")
  });
  res.status(200).json({ islogedIn: false, message: "Logout Successfully!" });
});
export default router;
