import express from "express";
import BeatsCollection from "../../Models/Beats.js";
import archiver from "archiver";
import axios from "axios";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Find beat in DB
    const beat = await BeatsCollection.findById({ _id: id });
    if (!beat) {
      return res
        .status(404)
        .json({ message: "Beat Not Found!", type: "error" });
    }
    const beatUrl = beat.audio; // Cloudinary link
    const beatTitle = beat.title?.replace(/ /g, "_") || "beat";

    // 2. Set ZIP response headers
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${beatTitle}.zip"`
    );

    // 3. Create ZIP stream
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);

    // 4. Fetch beat file from Cloudinary
    const response = await axios.get(beatUrl, { responseType: "stream" });
    // 5. Add beat to ZIP
    archive.append(response.data, { name: `${beatTitle}.mp3` });
    const thankYouNote = `
    Thank you for your purchase!
    
    We appreciate your support.
    You can use this beat in your projects as per the license terms.
    
    Enjoy your music journey!
    
    - Team BeatWave
    `;
    // 6. Add thank-you note
    archive.append(thankYouNote.trim(), { name: "Thank_You.txt" });

    // 7. Finalize archive
    await archive.finalize();
  } catch (error) {
    console.error("Download Error:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to create ZIP", type: "error" });
  }
});

export default router;
