import express, { response } from "express";
import BeatsCollection from "../../Models/Beats.js";

const router = express.Router();

router.get("/genre=:genre/bpm=:bpm", async (req, res) => {
  const { genre, bpm } = req.params;
  const bpmParts = bpm.split(",").map((str) => parseInt(str.trim(), 10));
  try {
    const query = {};
    if (genre && genre !== "none") {
      query.genre = genre.toLocaleLowerCase();
    }
    if (
      bpmParts.length === 2 &&
      !isNaN(bpmParts[0]) &&
      !isNaN(bpmParts[1]) &&
      bpmParts[0] >= 60 &&
      bpmParts[1] <= 200
    ) {
      query.bpm = { $gte: bpmParts[0], $lte: bpmParts[1] };
    }
    const beats = await BeatsCollection.find(query);
    if (!beats || beats.length === 0)
      return res
        .status(400)
        .json({ message: "Beat Not Found!", type: "error" });
    return res.status(200).json(beats);
  } catch (error) {
    console.log(error);
  }
});

export default router;
