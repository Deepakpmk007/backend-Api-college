const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./files");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

const upload = multer({ storage: multer.memoryStorage() });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
const BUCKET_NAME = process.env.SUPABASE_BUCKET;

const uploadFileToSupabase = async (file) => {
  const filePath = file.originalname; // Unique file name in the bucket

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) throw error;

  return data;
};

router.route("/").post(upload.array("file", 5), async (req, res) => {
  // res.send(req.file);
  console.log(req.files);
  try {
    // Check if files are received
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ error: "No files were uploaded" });
    }

    // Loop through each file and upload it to Supabase
    const uploadResponses = await Promise.all(
      req.files.map((file) => uploadFileToSupabase(file))
    );

    // Send response with information about each uploaded file
    res.status(200).send({
      message: "Files uploaded successfully!",
      files: uploadResponses,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
