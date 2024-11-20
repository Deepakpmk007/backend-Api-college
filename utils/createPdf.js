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
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
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
          flex-direction: row;
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
