import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config()

const router = express.Router();

router.post("/contact-us", async (req, res) => {
  const { name, email, subject, message } = req.body;
  // Create transport using Gmail or your SMTP provider
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:process.env.COMPANY_EMAIL, // Replace with your email
      pass:process.env.COMPANY_APP_PASSWORD, // Use App Password if 2FA is on
    },
  });

  const mailOptions = {
    from: email,
    to:process.env.COMPANY_EMAIL,             // Where you want to receive messages
    subject: `New Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true, message: "Message sent successfully!",type:"success" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Something went wrong!" });
  }

});
export default router;
