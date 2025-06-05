import express from "express"
const router  = express.Router();
router.post("/logout",(req, res) => {
    res.cookie("token", "");
    res.status(200).json({ islogedIn: false, message: "Logout Successfully!" });
  });
  export default router