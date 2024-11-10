const sendEmail = require("../utils/sendMail");

const catchAsync = require("../utils/catchAsync");

exports.sendEmailTo = catchAsync(async (req, res) => {
  console.log(req.body);
  sendEmail(req.body);

  res.status(200).json({
    status: "Send success",
    message: `The email is send to deepakpmk007@gmail.com`,
  });
});
