import express from "express";
import BeatsCollection from "../../Models/Beats.js";

const router = express.Router();

router.get("/genre/:genre", async (req, res) => {
  const { genre } = req.params;
  console.log(genre)
  const beats = await BeatsCollection.find({ genre });
  if (!beats)
    return res.status(400).json({ message: "Beat Not Found!", type: "error" });
  return res.status(200).json({ beats });
});

export default router;
