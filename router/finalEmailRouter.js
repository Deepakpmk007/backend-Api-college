const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transpoter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.HOST_MAIL,
    pass: process.env.HOST_PASS,
  },
});

// POST route to send email with attachments
router.post("/", async (req, res) => {
  const { email, fileName, remark } = req.body;
  try {
    let mailOptions = {
      from: process.env.HOST_MAIL,
      to: email,
      subject: "Sending an already uploaded file",
      text: remark,
      attachments: [
        {
          filename: fileName,
          path: `./files/${fileName}`, // Use the already uploaded file <pat></pat>h
        },
      ],
    };

    let info = await transpoter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
