const nodemailer = require("nodemailer");
const path = require("path");

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
// 2) Define the email options
const sendEmail = async function (req) {
  const files = req.files;
  console.log(files);
  const { subject, emailText, email } = req;
  const attachments = [];

  if (files && files.length > 0) {
    files.forEach((file) => {
      attachments.push({
        filename: file, // Original file name
        path: `./files/${file}`, // File path
        // path: path.join(__dirname, "files", file),
      });
    });
  }

  attachments.push({
    filename: "output.pdf", // Name for the default file
    path: `./out/output.pdf`, // Path to the default file
  });

  // 1) Create a transporter

  const mailOptions = {
    from: "deepakpmk9600@gmail.com",
    to: "Deepak <deepakpmk007@gmail.com>",
    subject: subject,
    html: `
      <h1>The sender Mail ${email}</h1>
      <h1>${emailText}</h1>
      <p>It is email to request the identifier data</p>
    `,
    attachments: attachments,
  };

  console.log("Message sent: %s", mailOptions.messageId);
  // 3) Actually send the email
  await transpoter.sendMail(mailOptions);
};

module.exports = sendEmail;
