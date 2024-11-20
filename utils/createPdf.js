const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");

async function generatePDF(data) {
  const filteredUserInfo = Object.entries(data)
    .filter(([_, value]) => value) // Keeps only entries where value is truthy
    .map(([key, value]) => ({ key, value }));

  const htmlContent = `
  <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Data PDF</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20mm; /* PDF-friendly margin */
        font-size: 12px; /* Optimized font size for PDF */
      }
      header {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10mm;
      }
      h1 {
        font-size: 16px;
        text-transform: uppercase;
        margin: 0;
        padding: 0;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 5mm;
      }
      table,
      th,
      td {
        border: 1px solid black;
      }
      th,
      td {
        padding: 5px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
        font-size: 12px;
      }
      td {
        font-size: 11px;
      }
      section {
        display: flex;
         flex-direction: row;
        font-size: 12px;
        justify-content: space-between;
        gap:30px;
        margin-top: 20mm;
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
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>Details</th>
            <th>Candidate Claim</th>
            <th>Verification (Yes/No)</th>
            <th>Comments</th>
          </tr>
          ${filteredUserInfo
            .map(
              (el) => `
            <tr>
              <th>${el.key}</th>
              <td>${el.value}</td>
              <td></td>
            <td></td>
            </tr>
          `
            )
            .join("")}
          <tr>
            <th>Verifier's Name and Designation</th>
            <td style="height: 120px"></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <section>
        <h4>FACULTY IN-CHARGE</h4>
        <h4>HEAD OF THE DEPARTMENT</h4>
      </section>
    </body>
  </html>
  `;

  // Output PDF path
  const pdfPath = path.join("./out/output.pdf");

  // Generate PDF
  return new Promise((resolve, reject) => {
    pdf.create(htmlContent, { format: "A4" }).toFile(pdfPath, (err, res) => {
      if (err) {
        console.error("Error generating PDF:", err);
        reject(err);
      } else {
        console.log("PDF saved to:", res.filename);
        resolve(res.filename);
      }
    });
  });
}

module.exports = generatePDF;
