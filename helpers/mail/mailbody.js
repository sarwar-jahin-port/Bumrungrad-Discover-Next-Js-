export const mailBody = (data) => {
  // Generate the field HTML dynamically based on the keys in the data object
  const fieldHtml = Object.keys(data)
    .filter((key) => data[key]) // Only include fields that have a value
    .map((key) => {
      // Capitalize the first letter of the key to use as the label
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      return `<p><span class="label">${label}:</span> <span class="value">${data[key]}</span></p>`;
    })
    .join(""); // Join all fields together into a single HTML string

  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${data.subject || "Submitted Form"}</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #b7b7b7;
                  margin: 0;
                  padding: 20px;
              }
              .container {
                  max-width: 100%;
                  margin: 0;
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h2 {
                  color: #333;
              }
              p {
                  font-size: 14px;
                  color: #555;
                  line-height: 0.5;
              }
              .label {
                  font-weight: bold;
                  color: #333;
                  font-size: 12px;
              }
              .value {
                  margin-left: 10px;
              }
          </style>
      </head>
      <body>
      
      <div class="container">
          <h2>${data.subject || "Submitted Form"}</h2>
          ${fieldHtml}
      </div>
      
      </body>
      </html>
    `;
};

export const comapanyMailBody = (data, mail_title) => {
  // Generate the table rows dynamically based on the keys in the data object
  const rowsHtml = Object.keys(data)
    .filter((key) => data[key]) // Only include fields that have a value
    .map((key) => {
      // Capitalize the first letter of the key to use as the label
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      return `<tr>
                <td class="label">${label}</td>
                <td>${data[key]}</td>
              </tr>`;
    })
    .join(""); // Join all rows together into a single HTML string

  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${mail_title || "Submitted Form"}</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  line-height: 1.6;
                  color: #333;
                  background-color: #b7b7b7;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  max-width: 800px;
                  margin: 0 auto;
                  background-color: #F8F6F6;
              }
              .header {
                  background-color: #D9D9D9;
                  padding: 20px;
                  text-align: center;
              }
              .logo-container {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  max-width: 100%;
                  margin: 0 auto;
              }
              .content {
                  padding: 30px;
              }
              h1 {
                  color: #005baa;
                  font-size: 24px;
                  margin-top: 0;
                  margin-bottom: 20px;
              }
              .form-data {
                  background-color: #F8F6F6;
                  padding: 20px;
                  border-radius: 5px;
                  margin-bottom: 20px;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
              }
              th {
                  background-color: #e4e4e4;
                  color: white;
                  padding: 12px;
                  text-align: left;
              }
              td {
                  padding: 12px;
                  border-bottom: 1px solid #ddd;
              }
              .label {
                  font-weight: bold;
                  color: #555;
                  width: 30%;
              }
              .footer {
                  background-color: #D9D9D9;
                  padding: 20px;
                  text-align: center;
                  font-size: 14px;
                  color: #666;
              }
              .contact-info {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  margin-top: 20px;
              }
              .office {
                  flex-basis: 48%;
                  margin-bottom: 15px;
                  background-color: white;
                  padding: 15px;
                  border-radius: 5px;
                  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
              }
              .office h4 {
                  color: #005baa;
                  margin-top: 0;
                  margin-bottom: 10px;
              }
              .office p {
                  margin: 5px 0;
                  font-size: 13px;
              }
              a {
                  color: #005baa;
                  text-decoration: none;
              }
              a:hover {
                  text-decoration: underline;
              }
              .form-header {
                  background-color: #005baa;                 
                  font-weight: bold;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <!-- Header with Logos -->
              <div class="header">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                    <td align="left" width="33.33%">
                    <img src="https://i.ibb.co/GvMDFj09/bum.png" alt="Bumrungrad International Hospital" width="180" style="display: block; max-width: 100%; height: auto; border: 0;">
                    </td>
                    <td align="center" width="33.33%">
                    <img src="https://i.ibb.co/Xg4Wjn7/bum-dis.png" alt="Bumrungrad Discover" width="150" style="display: block; max-width: 100%; height: auto; border: 0;">
                    </td>
                    <td align="right" width="33.33%">
                    <img src="https://i.ibb.co/xtnHNXwx/bum-v.png" alt="Vitalife" width="120" style="display: block; max-width: 100%; height: auto; border: 0;">
                    </td>
                </tr>
</table>
              </div>

              <!-- Main Content -->
              <div class="content">
                  <h1>${mail_title || "Company Form Submission"}</h1>
                  
                  <div class="form-data">
                      <table>
                          <tr class="form-header">
                              <th colspan="2">Submission Details</th>
                          </tr>
                          ${rowsHtml}
                      </table>
                  </div>
              </div>

              <!-- Footer -->
              <div class="footer">
                  <p>If you have any questions or need further assistance, please don't hesitate to contact us at <a href="mailto:support@bumrungraddiscover.com">support@bumrungraddiscover.com</a></p>
                  <p>Thank you for choosing Bumrungrad International Hospital!</p>
                  <!--  
                  <div class="contact-info">
                      <div class="office">
                          <h4>Dhanmondi Office</h4>
                          <p>Rupayan Prime Tower</p>
                          <p>10th Floor (Lift-9)</p>
                          <p>House:02, Road: 07, Green Road</p>
                          <p>Dhanmondi, Dhaka-1205</p>
                          <p>Phone: <a href="tel:+8801847284860">+8801847284860</a></p>
                          <p>Phone: <a href="tel:+8801324418100">+8801324418100</a></p>
                      </div>
                      
                      <div class="office">
                          <h4>Uttara Office</h4>
                          <p>Sector-13, House: 01</p>
                          <p>Janapadd Road</p>
                          <p>Opposite of Bata Showroom</p>
                          <p>&nbsp;</p>
                          <p>Phone: <a href="tel:+8801601284300">+8801601284300</a></p>
                          <p>Phone: <a href="tel:+8801977284861">+8801977284861</a></p>
                      </div>
                      
                      <div class="office">
                          <h4>Banani Office</h4>
                          <p>Alamin Park Panorama (Beside Banani Post Office)</p>
                          <p>8th Floor (Lift-5)</p>
                          <p>Road 13/A, Block - C, House 105</p>
                          <p>Banani, Dhaka - 1213</p>
                          <p>Phone: <a href="tel:+8801977284860">+8801977284860</a></p>
                          <p>Phone: <a href="tel:+8801847284862">+8801847284862</a></p>
                      </div>
                      
                      <div class="office">
                          <h4>Chattogram Office</h4>
                          <p>Daar E Shahidi Building</p>
                          <p>3rd Floor, (Lift-3)</p>
                          <p>House: 69, Agrabad C/A</p>
                          <p>Chattogram-4100</p>
                          <p>Phone: <a href="tel:+8801847284863">+8801847284863</a></p>
                          <p>Phone: <a href="tel:+8801847284862">+8801847284862</a></p>
                      </div>
                  </div> -->
              </div>
          </div>
      </body>
      </html>
    `;
};

export const userMailBody = (data, mail_title) => {
  const fieldHtml = Object.keys(data)
    .filter((key) => data[key]) // Only include fields that have a value
    .map((key) => {
      // Capitalize the first letter of the key to use as the label
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      return `<tr>
                <td class="label">${label}</td>
                <td>${data[key]}</td>
              </tr>`;
    })
    .join(""); // Join all fields together into a single HTML string

  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${mail_title || "Submitted Form"}</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  line-height: 1.6;
                  color: #333;
                  background-color: #b7b7b7;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  max-width: 800px;
                  margin: 0 auto;
                  background-color: #F8F6F6;
              }
              .header {
                  background-color: #D9D9D9;
                  padding: 20px;
                  text-align: center;
              }
              .logo-container {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  max-width: 100%;
                  margin: 0 auto;
              }
              .content {
                  padding: 30px;
              }
              h1 {
                  color: #005baa;
                  font-size: 24px;
                  margin-top: 0;
                  margin-bottom: 20px;
              }
              .form-data {
                  background-color: #F8F6F6;
                  padding: 20px;
                  border-radius: 5px;
                  margin-bottom: 20px;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
              }
              th {
                  background-color: #e4e4e4;
                  color: white;
                  padding: 12px;
                  text-align: left;
              }
              td {
                  padding: 12px;
                  border-bottom: 1px solid #ddd;
              }
              .label {
                  font-weight: bold;
                  color: #555;
                  width: 30%;
              }
              .footer {
                  background-color: #D9D9D9;
                  padding: 20px;
                  text-align: center;
                  font-size: 14px;
                  color: #666;
              }
              .contact-info {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  margin-top: 20px;
              }
              .office {
                  flex-basis: 48%;
                  margin-bottom: 15px;
                  background-color: white;
                  padding: 15px;
                  border-radius: 5px;
                  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
              }
              .office h4 {
                  color: #005baa;
                  margin-top: 0;
                  margin-bottom: 10px;
              }
              .office p {
                  margin: 5px 0;
                  font-size: 13px;
              }
              a {
                  color: #005baa;
                  text-decoration: none;
              }
              a:hover {
                  text-decoration: underline;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <!-- Header with Logos -->
              <div class="header">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td align="left" width="33.33%">
                <img src="https://i.ibb.co/GvMDFj09/bum.png" alt="Bumrungrad International Hospital" width="180" style="display: block; max-width: 100%; height: auto; border: 0;">
                </td>
                <td align="center" width="33.33%">
                <img src="https://i.ibb.co/Xg4Wjn7/bum-dis.png" alt="Bumrungrad Discover" width="150" style="display: block; max-width: 100%; height: auto; border: 0;">
                </td>
                <td align="right" width="33.33%">
                <img src="https://i.ibb.co/xtnHNXwx/bum-v.png" alt="Vitalife" width="120" style="display: block; max-width: 100%; height: auto; border: 0;">
                </td>
            </tr>
</table>
              </div>

              <!-- Main Content -->
              <div class="content">
                  <h1>${mail_title || "Submitted Form"}</h1>
                  
                  <div class="form-data">
                      <table>
                          <tr>
                              <th colspan="2" style="background-color: #e6f2ff; color: #005baa;">Form Submission Details</th>
                          </tr>
                          ${fieldHtml}
                      </table>
                  </div>
              </div>

              <!-- Footer -->
              <div class="footer">
                  <p>If you have any questions or need further assistance, please don't hesitate to contact us at <a href="mailto:support@bumrungraddiscover.com">support@bumrungraddiscover.com</a></p>
                  <p>Thank you for choosing Bumrungrad International Hospital!</p>
                  
                  <!--
                  <div class="contact-info">
                      <div class="office">
                          <h4>Dhanmondi Office</h4>
                          <p>Rupayan Prime Tower</p>
                          <p>10th Floor (Lift-9)</p>
                          <p>House:02, Road: 07, Green Road</p>
                          <p>Dhanmondi, Dhaka-1205</p>
                          <p>Phone: <a href="tel:+8801847284860">+8801847284860</a></p>
                          <p>Phone: <a href="tel:+8801324418100">+8801324418100</a></p>
                      </div>
                      
                      <div class="office">
                          <h4>Uttara Office</h4>
                          <p>Sector-13, House: 01</p>
                          <p>Janapadd Road</p>
                          <p>Opposite of Bata Showroom</p>
                          <p>&nbsp;</p>
                          <p>Phone: <a href="tel:+8801601284300">+8801601284300</a></p>
                          <p>Phone: <a href="tel:+8801977284861">+8801977284861</a></p>
                      </div>
                      
                      <div class="office">
                          <h4>Banani Office</h4>
                          <p>Alamin Park Panorama (Beside Banani Post Office)</p>
                          <p>8th Floor (Lift-5)</p>
                          <p>Road 13/A, Block - C, House 105</p>
                          <p>Banani, Dhaka - 1213</p>
                          <p>Phone: <a href="tel:+8801977284860">+8801977284860</a></p>
                          <p>Phone: <a href="tel:+8801847284862">+8801847284862</a></p>
                      </div>
                      
                      <div class="office">
                          <h4>Chattogram Office</h4>
                          <p>Daar E Shahidi Building</p>
                          <p>3rd Floor, (Lift-3)</p>
                          <p>House: 69, Agrabad C/A</p>
                          <p>Chattogram-4100</p>
                          <p>Phone: <a href="tel:+8801847284863">+8801847284863</a></p>
                          <p>Phone: <a href="tel:+8801847284862">+8801847284862</a></p>
                      </div> 
                  </div> -->
              </div> 
          </div>
      </body>
      </html>
    `;
};
export const mailBodyMedicine = (data, mail_title) => {
  // Parse the medicines field as it's a string representation of an array
  let medicinesArray = [];
  if (data.medicines) {
    try {
      medicinesArray = JSON.parse(data.medicines);
    } catch (error) {
      console.error("Failed to parse medicines array", error);
    }
  }

  // Generate the medicines table if the array is valid
  const rowsHtml =
    medicinesArray.length > 0
      ? medicinesArray
          .map((medicine) => {
            if (Array.isArray(medicine) && medicine.length === 2) {
              return `<tr><td class="label">Medicine Name:</td><td class="value">${medicine[0]}</td></tr>
                            <tr><td class="label">Quantity:</td><td class="value">${medicine[1]}</td></tr>`;
            }
            return ""; // Return empty string if format is incorrect
          })
          .join("")
      : "<tr><td colspan='2'>No medicines prescribed.</td></tr>";

  // Main HTML template
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${mail_title || "Submitted Form"}</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  line-height: 1.6;
                  color: #333;
                  background-color: #b7b7b7;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  max-width: 800px;
                  margin: 0 auto;
                  background-color: #F8F6F6;
              }
              .header {
                  background-color: #D9D9D9;
                  padding: 20px;
                  text-align: center;
              }
              .logo-container {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  max-width: 100%;
                  margin: 0 auto;
              }
              .content {
                  padding: 30px;
              }
              h1 {
                  color: #005baa;
                  font-size: 24px;
                  margin-top: 0;
                  margin-bottom: 20px;
              }
              .patient-info {
                  background-color: #f5f5f5;
                  padding: 20px;
                  border-radius: 5px;
                  margin-bottom: 20px;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
              }
              th {
                  background-color: #e4e4e4;
                  color: white;
                  padding: 12px;
                  text-align: left;
              }
              td {
                  padding: 12px;
                  border-bottom: 1px solid #ddd;
              }
              .label {
                  font-weight: bold;
                  color: #555;
                  width: 30%;
              }
              .footer {
                  background-color: #D9D9D9;
                  padding: 20px;
                  text-align: center;
                  font-size: 14px;
                  color: #666;
              }
              .contact-info {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  margin-top: 20px;
              }
              .office {
                  flex-basis: 48%;
                  margin-bottom: 15px;
                  background-color: white;
                  padding: 15px;
                  border-radius: 5px;
                  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
              }
              .office h4 {
                  color: #005baa;
                  margin-top: 0;
                  margin-bottom: 10px;
              }
              .office p {
                  margin: 5px 0;
                  font-size: 13px;
              }
              a {
                  color: #005baa;
                  text-decoration: none;
              }
              a:hover {
                  text-decoration: underline;
              }
              .medicines-header {
                  background-color: #e6f2ff;
                  font-weight: bold;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <!-- Header with Logos -->
              <div class="header">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                    <td align="left" width="33.33%">
                    <img src="https://i.ibb.co/GvMDFj09/bum.png" alt="Bumrungrad International Hospital" width="180" style="display: block; max-width: 100%; height: auto; border: 0;">
                    </td>
                    <td align="center" width="33.33%">
                    <img src="https://i.ibb.co/Xg4Wjn7/bum-dis.png" alt="Bumrungrad Discover" width="150" style="display: block; max-width: 100%; height: auto; border: 0;">
                    </td>
                    <td align="right" width="33.33%">
                    <img src="https://i.ibb.co/xtnHNXwx/bum-v.png" alt="Vitalife" width="120" style="display: block; max-width: 100%; height: auto; border: 0;">
                    </td>
                </tr>
    </table>
              </div>

              <!-- Main Content -->
              <div class="content">
                  <h1>${mail_title || "Medicine Prescription"}</h1>
                  
                  <div class="patient-info">
                      <table>
                          <tr>
                              <td class="label">Patient Name:</td>
                              <td>${data.name || "N/A"}</td>
                          </tr>
                          <tr>
                              <td class="label">Address:</td>
                              <td>${data.address || "N/A"}</td>
                          </tr>
                          <tr>
                              <td class="label">Phone Number:</td>
                              <td>${data.phoneNumber || "N/A"}</td>
                          </tr>
                          <tr>
                              <td class="label">Email:</td>
                              <td>${data.email || "N/A"}</td>
                          </tr>
                          <tr>
                              <td class="label">Prescription:</td>
                              <td>${data.prescription || "N/A"}</td>
                          </tr>
                      </table>
                  </div>

                  <h2 style="color: #005baa; font-size: 18px; margin-bottom: 15px;">Prescribed Medicines</h2>
                  <table>
                      <tr class="medicines-header">
                          <th>Medicine</th>
                          <th>Details</th>
                      </tr>
                      ${rowsHtml}
                  </table>
              </div>

              <!-- Footer -->
              <div class="footer">
                  <p>If you have any questions or need further assistance, please don't hesitate to contact us at <a href="mailto:support@bumrungraddiscover.com">support@bumrungraddiscover.com</a></p>
                  <p>Thank you for choosing Bumrungrad International Hospital!</p>
                  
                  <!-- 
                  <div class="contact-info">
                      <div class="office">
                          <h4>Dhanmondi Office</h4>
                          <p>Rupayan Prime Tower</p>
                          <p>10th Floor (Lift-9)</p>
                          <p>House:02, Road: 07, Green Road</p>
                          <p>Dhanmondi, Dhaka-1205</p>
                          <p>Phone: <a href="tel:+8801847284860">+8801847284860</a></p>
                          <p>Phone: <a href="tel:+8801324418100">+8801324418100</a></p>
                      </div>
                      
                      <div class="office">
                          <h4>Uttara Office</h4>
                          <p>Sector-13, House: 01</p>
                          <p>Janapadd Road</p>
                          <p>Opposite of Bata Showroom</p>
                          <p>&nbsp;</p>
                          <p>Phone: <a href="tel:+8801601284300">+8801601284300</a></p>
                          <p>Phone: <a href="tel:+8801977284861">+8801977284861</a></p>
                      </div>
                      
                      <div class="office">
                          <h4>Banani Office</h4>
                          <p>Alamin Park Panorama (Beside Banani Post Office)</p>
                          <p>8th Floor (Lift-5)</p>
                          <p>Road 13/A, Block - C, House 105</p>
                          <p>Banani, Dhaka - 1213</p>
                          <p>Phone: <a href="tel:+8801977284860">+8801977284860</a></p>
                          <p>Phone: <a href="tel:+8801847284862">+8801847284862</a></p>
                      </div>
                      
                      <div class="office">
                          <h4>Chattogram Office</h4>
                          <p>Daar E Shahidi Building</p>
                          <p>3rd Floor, (Lift-3)</p>
                          <p>House: 69, Agrabad C/A</p>
                          <p>Chattogram-4100</p>
                          <p>Phone: <a href="tel:+8801847284863">+8801847284863</a></p>
                          <p>Phone: <a href="tel:+8801847284862">+8801847284862</a></p>
                      </div>
                  </div>
              </div> 
              -->
          </div>
      </body>
      </html>
    `;
};
