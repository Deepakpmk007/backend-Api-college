const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = mongoose.Schema({
  uniqueId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name must to be enter."],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Date of Birth must to be enter."],
  },
  regNo: {
    type: Number,
    required: [true, "A reg number must be enter"],
  },
  drgree: {
    type: String,
    default: "B.E",
  },
  Branch: {
    type: String,
    // default: "Computer Science Engineering",
  },

  nameOfTheInstitution: {
    type: String,
    default: "Government College of Engineering Srirangam,Trichy 620012",
  },
  University: {
    type: String,
    default: "Anna University chennai",
  },
  yearOfPassing: {
    type: String,
    // required: [true, "Year of Passing must to be enter."],
  },
  yearOfStudy: {
    type: String,
    // required: [true, "Year of study must to be enter."],
  },
  CGPA: Number,
  backlogs: String,
  classObtain: {
    type: String,
    // required: [true, "class obtain must be enter."],
  },
  remark: {
    type: String,
    default: null,
    trim: true,
  },
  file: {
    type: Array,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verifiedBY: String,
  applicantID: {
    type: mongoose.Schema.ObjectId,
    ref: "ApplicantData",
  },
});

const StudentData = mongoose.model("StudentData", studentSchema);

module.exports = StudentData;
