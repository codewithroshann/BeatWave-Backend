import express from 'express'
import BeatsCollection from '../../Models/Beats.js';

const router = express.Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;
      try {
      const beat = await BeatsCollection.findOne({ _id: id });
      return res.status(200).json({ beat });
    } catch (err) {
      console.log(err);
    }
  });

  export default router