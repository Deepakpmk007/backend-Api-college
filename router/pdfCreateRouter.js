const express = require("express");
const createPdfController = require("../controller/createPdfController");

const router = express.Router();

router.route("/").post(createPdfController.createPdf);

module.exports = router;
