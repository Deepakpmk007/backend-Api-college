const ApplicantData = require("../model/applicantDataModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllApplicant = catchAsync(async (req, res) => {
  const applicants = await ApplicantData.find();

  res.status(200).json({
    status: "success",
    requestAt: req.requestTime,
    results: applicants.length,
    data: {
      applicants,
    },
  });
});

exports.getApplicant = catchAsync(async (req, res) => {
  const applicants = await ApplicantData.find({ name: req.params.name });

  res.status(200).json({
    status: "success",
    requestAt: req.requestTime,
    results: applicants.length,
    data: {
      applicants,
    },
  });
});

exports.createApplicant = catchAsync(async (req, res) => {
  const newApplicant = await ApplicantData.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      newApplicant,
    },
  });
});
