const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const studentRoute = require("./router/studentDataRoute");
const applicantRoute = require("./router/applicantDataRouter");
const sendEmailRoute = require("./router/emailSendRouter");
const uploadFileRouter = require("./router/fileUploadRouter");
const finalEmail = require("./router/finalEmailRouter");
// const createPdfRouter = require("./router/pdfCreateRouter");
const AppError = require("./utils/appError");
const globalError = require("./controller/errorController");
const generatePDF = require("./utils/createPdf");

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware🔥");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/student", studentRoute);
app.use("/api/v1/applicant", applicantRoute);
app.use("/api/v1/email", sendEmailRoute);
app.use("/api/v1/upload", uploadFileRouter);
app.use("/api/v1/finalEmail", finalEmail);
app.post("/api/v1/generate-pdf", async (req, res) => {
  try {
    const data = req.body; // Get data from the request body
    await generatePDF(data); // Pass data to the PDF generator function
    res.status(200).send("PDF generated successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalError);

module.exports = app;
