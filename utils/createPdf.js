// pdfGenerator.js
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// Function to generate PDF from HTML and save it to a file
async function generatePDF(data) {
  const filteredUserInfo = Object.entries(data)
    .filter(([_, value]) => value) // Keeps only entries where value is truthy
    .map(([key, value]) => ({ key, value }));
  const htmlContent = `
<html lang="en">
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
      }
      img {
        width: 100px;
      }
      header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      h1 {
        text-align: center;
        font-size: 1.2rem;
        text-transform: uppercase;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      table,
      th,
      td {
        border: 1px solid black;
      }
      th,
      td {
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
      section {
        display: flex;
        margin-top: 150px;
        justify-content: space-between;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Government College of Engineering Srirangam</h1>
    </header>
    <h1>Verification Information</h1>
    <table>
      <tbody>
        <tr>
          <th>Refer ID</th>
          <td>${data.uniqueId}</td>
        </tr>
        <tr>
          <th>Details</th>
          <th>Candidate Claim</th>
          <th>Verification (Yes/No)</th>
          <th>Comments</th>
        </tr>

      ${filteredUserInfo.map(
        (el) => `
       <tr >
          <th>${el.key}</th>
          <td >${el.value}</td>
        </tr>
      `
      )}
        <tr>
          <th>Verifer's name and Designation</th>
          <td style="height: 120px"></td>
        </tr>
      </tbody>
    </table>

    <section>
      <h4>FACULTY IN-CHARGE</h4>
      <h4>HEAD OF THE DEPARTMENT</h4>
      <h4>PRINCIPAL</h4>
    </section>
  </body>
</html>

  `;
  // Read the HTML template
  // let html = fs.readFileSync("template.html", "utf8");
  // // Replace placeholders with actual data
  // html = html.replace("{{id}}", data.id || "nil");
  // html = html.replace("{{uniqueId}}", data.uniqueId || "nil");
  // html = html.replace("{{name}}", data.name || "nil");
  // html = html.replace("{{dateOfBirth}}", data.dateOfBirth || "nil");
  // html = html.replace("{{regNo}}", data.regNo || "nil");
  // html = html.replace("{{degree}}", data.drgree || "nil");
  // html = html.replace("{{branch}}", data.Branch || "nil");
  // html = html.replace("{{yearOfPassing}}", data.yearOfPassing || "nil");
  // html = html.replace("{{yearOfStudy}}", data.yearOfStudy || "nil");
  // html = html.replace("{{CGPA}}", data.CGPA || "nil");
  // html = html.replace("{{ClassObtained}}", data.classObtain || "nil");
  // html = html.replace("{{Backlogs}}", data.backlogs || "nil");

  // // Launch Puppeteer browser to generate PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set content to the modified HTML
  await page.setContent(htmlContent);

  // Path to save the PDF locally
  const pdfPath = path.join("./out/output.pdf");

  // Generate PDF and save it to the file system
  await page.pdf({
    path: pdfPath, // Save to a local file
    format: "A4",
    printBackground: true,
  });

  await browser.close();
  return pdfPath; // Return the file path
}

module.exports = generatePDF;
