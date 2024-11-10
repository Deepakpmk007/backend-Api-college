const generatePDF = require("../utils/createPdf");
const catchAsync = require("../utils/catchAsync");

exports.createPdf = catchAsync(async (req, res, next) => {
  const data = req.body; // Get data from the request body
  await generatePDF(data); // Pass data to the PDF generator function
  res.status(200).send("PDF generated successfully!");
});
