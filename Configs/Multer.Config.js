import multer from "multer";

//Multer storage configration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      const randomDigits = Math.floor(1 + Math.random() * 900);
      if (file.mimetype === "audio/mpeg") {
        cb(null, file.originalname.replace(/\.mp3$/, `-${randomDigits}.mp3`));
      }
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(
          null,
          file.originalname.replace(
            /\.(jpg|jpeg|png)$/,
            `-${randomDigits}.${file.mimetype.split("/")[1]}`
          )
        );
      }
    },
  });
  const upload = multer({ storage: storage });
  export default upload