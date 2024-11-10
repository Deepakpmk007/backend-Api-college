const express = require("express");

const studentController = require("../controller/studentDataController");

const router = express.Router();

router
  .route("/")
  .get(studentController.getAllStudent)
  .post(studentController.createStudent);

router.route("/verified").get(studentController.getVerifiedStudents);
router.route("/Unverified").get(studentController.getUnVerifiedStudents);

router
  .route("/:id")
  .get(studentController.getStudent)
  .put(studentController.updateStudent);

router.route("/verified/:id").put(studentController.updateVerifiedStatus);

module.exports = router;
