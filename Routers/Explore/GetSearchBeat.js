import express from "express";
import BeatsCollection from "../../Models/Beats.js";

const router = express.Router();

router.get("/:value", async (req, res) => {
  const { value } = req.params;
  try {
    if (value ==="" || !value) {
      const beat = await BeatsCollection.find();
      return res.status(200).json({ beat });
    }
    const beat = await BeatsCollection.find({
      $or: [
        { title: { $regex: value, $options: "i" } },
        { genre: { $regex: value, $options: "i" } },
      ],
    });
 if (Array.isArray(beat) && beat.length === 0||beat==[]) {
   return res.status(400).json({ message: "Beat Not Found!" });
 }
    return res.status(200).json({ beat });
  } catch (error) {}
});

export default router;
