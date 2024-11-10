const express = require("express");

const applicantController = require("../controller/applicantDataController");

const router = express.Router();

router
  .route("/")
  .get(applicantController.getAllApplicant)
  .post(applicantController.createApplicant);

router.route("/:name").get(applicantController.getApplicant);

module.exports = router;
