const mongoose = require("mongoose");
const validator = require("validator");

const applicantSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must to be enter"],
  },
  email: {
    type: String,
    required: [true, "email must to be enter"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  contactNo: {
    type: Number,
    required: [true, "contact no must be enter"],
  },
});

const ApplicantData = mongoose.model("ApplicantData", applicantSchema);

module.exports = ApplicantData;
