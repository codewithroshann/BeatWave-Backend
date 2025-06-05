import express from "express"
import BeatsCollection from "../../Models/Beats.js";
const router = express.Router();
router.get("/explore", async (req, res) => {
 
    try {
      const beats = await BeatsCollection.find();
      return res.status(200).json({ beats });
    } catch (err) {
      res.status(400).json({ err });
    }
  });

  export default router