import express from "express";
import upload from "../../Configs/Multer.Config.js";
import { v2 as cloudinary } from "cloudinary";
import BeatsCollection from "../../Models/Beats.js";
import fs from "fs";
const router = express.Router();

router.post(
  "/beat-uploads",
  upload.fields([
    { name: "beatFile", maxCount: 1 },
    { name: "thumbnailFile", maxCount: 1 },
  ]),
  async (req, res) => {
    const { title, producer, genre, bpm, price, description } = req.body;
    const beatFile = req.files?.beatFile?.[0];
    const thumbnailFile = req.files?.thumbnailFile?.[0];

    try {
      const thumbnailUploadResult = await cloudinary.uploader
        .upload(thumbnailFile.path, {
          resource_type: "auto",
          folder: "BeatWave/Images",
        })
        .catch((error) => {
          console.log(error);
        });
      const beatUploadResult = await cloudinary.uploader
        .upload(beatFile.path, {
          resource_type: "auto",
          folder: "BeatWave/Beats",
        })
        .catch((error) => {
          console.log(error, "audio upload error");
        });

      const beatInfoFile = await BeatsCollection.create({
        title,
        producer,
        genre,
        bpm,
        price,
        description,
        thumbnail: thumbnailUploadResult.secure_url,
        audio: beatUploadResult.secure_url,
      });
      res.status(200).json({
        ok: true,
        redirectUrl: "/",
        message: "Beat Uploaded Successfully!",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Something went wrong!", type: "error" });
    }
    if (req.files) {
      fs.unlink(`${beatFile.path}`, (err) => {
        if (err) throw err;
        console.log("beatfile deleted!");
      });
      fs.unlink(`${thumbnailFile.path}`, (err) => {
        if (err) throw err;
        console.log("thumbnailFile deleted!");
      });
    }
  }
);

export default router;
