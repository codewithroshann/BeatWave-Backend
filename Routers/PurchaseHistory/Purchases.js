import express from "express";
import jwt from "jsonwebtoken";
import purchaseHistory from "../../Models/PurchaseHistory.js";

const router = express.Router();

router.get("/purchases", async (req, res) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      message: "Unauthorized",
      type: "error",
      redirectUrl: "/auth/user/login",
    });
  try {
    const cookie = jwt.verify(token, process.env.JWT_SECRET);
    const userId = cookie.id;
    const purchaseInfo = await purchaseHistory.find({ userId: userId });
    if (purchaseInfo.length == 0||!purchaseInfo)
      return res.status(400).json({ message: "No purchases found" });

    const populatedbeats = await purchaseHistory
      .find({ userId: userId })
      .populate("beats");
    const beats = populatedbeats.flatMap((entry) => entry.beats);
    return res.status(200).json({
      purchases: purchaseInfo,
      beats: beats,
      populatedbeats: { populatedbeats, beats },
    });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
