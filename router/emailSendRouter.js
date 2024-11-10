const express = require("express");

const emailSendController = require("../controller/sendMailController");

const router = express.Router();

router.route("/").post(emailSendController.sendEmailTo);

module.exports = router;
