"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendInvitationEmail(
  recipientEmail,
  acceptLink,
) {
  console.log(
    `sending email to ${recipientEmail} with ${acceptLink}  `
  );
  await transporter.sendMail({
    from: "UAegean-myIDs@i4mlabUAegean.onmicrosoft.com", // sender address
    to: recipientEmail, // list of receivers
    subject: "The Issuance of your KYB Portable Identity is Enabled", // Subject line
    text: "This is an automated email ", // plain text body
    html: `<h3>You can now issue your KYB Verifiable Credential</h3> 
    <div  style="margin-Top: 3rem"> Thank you for registering your Organization to the KYB Custodian  Verifiable Data Public Registry.</div>
    <div> You can now issue a Portable KYB Identity Card as a 
    Verifiable Credential. This  Card will contain your KYB profile (Natural person and Organization details)  </div>
    <div  style="margin-Top: 3rem"> To do so use the following link </div>
    <div style="margin-Top: 3rem">
    Please click ${acceptLink} to proceed to the issuance of your KYB Digital Identity Card.
    </div>`,
  });
}
 
module.exports = {
  sendInvitationEmail,
};
