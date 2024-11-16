const nodemailer = require("nodemailer");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
const BUCKET_NAME = process.env.SUPABASE_BUCKET;

async function getFileUrl(fileName) {
  try {
    // Construct the file path
    const filePath = fileName;

    // Generate the public URL
    const { publicURL, error } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    if (error) {
      console.error("Error generating public URL:", error);
      throw new Error("Failed to generate public URL");
    }
    console.log(publicURL);

    return publicURL; // Return the generated public URL
  } catch (error) {
    console.error("Error in getPublicUrlByFileName:", error.message);
    throw error;
  }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.HOST_MAIL,
    pass: process.env.HOST_PASS,
  },
});

const sendEmail = async function (req) {
  const filePaths = req.body.filePaths; // Handle multiple files (if using multer, req.files)
  console.log("Received file paths:", filePaths);

  const { subject, emailText, email } = req.body;
  const fileUrls = [];
  const attachments = [];

  if (filePaths && filePaths.length > 0) {
    for (const filePath of filePaths) {
      try {
        const publicUrl = await getFileUrl(filePath);
        // const fileName = filePath.split("/").pop(); // Extract file name
        fileUrls.push(publicUrl);
      } catch (error) {
        console.error("Error fetching file URL:", error);
      }
    }
  }

  const mailOptions = {
    from: "deepakpmk9600@gmail.com",
    to: "Deepak <deepakpmk007@gmail.com>",
    subject: subject,
    html: `
      <h1>Sender's Email: ${email}</h1>
      <h2>${emailText}</h2>
      <p>Here are the requested files:</p>
      <ul>
        ${filePaths
          .map(
            (fileName) =>
              `<li><a href="https://pvixsukqosxgzqfpvnvs.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${fileName}" target="_blank">${fileName}</a></li>`
          )
          .join("")}
      </ul>
    `,
    attachments: {
      filename: "output.pdf", // Name for the default file
      path: `./out/output.pdf`, // Path to the default file
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
