const StudentData = require("../model/studentDataModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllStudent = catchAsync(async (req, res, next) => {
  const students = await StudentData.find();
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    requestAt: req.requestTime,
    results: students.length,
    data: {
      students,
    },
  });
});

exports.getStudent = catchAsync(async (req, res, next) => {
  const student = await StudentData.findById(req.params.id).populate(
    "applicantID"
  );
  // if (student === 0) {
  //   next(new AppError("NO student with this name", 404));
  // }

  res.status(200).json({
    status: "success",
    results: student.length,
    data: {
      student,
    },
  });
});

exports.createStudent = catchAsync(async (req, res, next) => {
  const newStudent = await StudentData.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      student: newStudent,
    },
  });
});

exports.updateStudent = catchAsync(async (req, res, next) => {
  const newStudent = await StudentData.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "success",
    data: {
      student: newStudent,
    },
  });
});

exports.getVerifiedStudents = catchAsync(async (req, res) => {
  // Query to find only the students where verified is true
  const verifiedStudents = await StudentData.find({ verified: true });

  if (verifiedStudents.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No verified students found",
    });
  }

  // Send the list of verified students as the response
  res.status(200).json({
    status: "success",
    results: verifiedStudents.length,
    data: {
      students: verifiedStudents,
    },
  });
});

exports.getUnVerifiedStudents = catchAsync(async (req, res) => {
  // Query to find only the students where verified is true
  const verifiedStudents = await StudentData.find({ verified: false });

  if (verifiedStudents.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No verified students found",
    });
  }

  // Send the list of verified students as the response
  res.status(200).json({
    status: "success",
    results: verifiedStudents.length,
    data: {
      students: verifiedStudents,
    },
  });
});

exports.updateVerifiedStatus = catchAsync(async (req, res) => {
  const updatedStudent = await StudentData.findByIdAndUpdate(
    req.params.id,
    {
      verified: req.body.verified,
      // verifiedBY: verifiedBY || 'Admin', // Optionally update the verified by field
    },
    { new: true, runValidators: true }
  );

  if (!updatedStudent) {
    return res.status(404).json({
      status: "fail",
      message: "No student found with that ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      student: updatedStudent,
    },
  });
});
