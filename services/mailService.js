"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

const transportOptions = {
  host: "smtp.office365.com",
  port: "587",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  secureConnection: true,
  tls: { ciphers: "SSLv3" },
};

// console.log(transportOptions)
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(
  //   {
  //   host: "smtp.office365.com",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // }
  transportOptions
);


async function sendInvitationEmail(
  recipientEmail,
  acceptLink,
  firstName,
  lastName
) {
  console.log(`sending email to ${recipientEmail} with ${acceptLink}  `);
  await transporter.sendMail({
    from: "grids-kyb-custodian@i4mlabUAegean.onmicrosoft.com", // sender address
    to: recipientEmail, // list of receivers
    subject:
      "[GRIDS KYB Custodian Service] Portable KYB Profile Card generation invitation", // Subject line
    text: "This is an automated email ", // plain text body
    html: `
    <div>
    <p>Hi ${firstName} ${lastName},</p>
    <p>Thank you for registering your Organization to the KYB Custodian Verifiable Data Public Registry.    </p>
    <p>You can now issue a Portable KYB Profile Card as a Verifiable Credential. This Card will contain your KYB profile (Natural Person details and Company KYB attribute details) and can be used to instantly prove it to any compliant Service Provider. 
    To learn more about Verifiable Credentials click <a href="https://www.evernym.com/blog/gentle-introduction-verifiable-credentials/">here</a>.
    </p>
    <p>Please click ${acceptLink} to proceed to the issuance of your KYB Digital Identity Card. </p>
    <p style="margin-top:2rem">Thank you!</p>
    <p>The Administration team</p>
    <p style="margin-top:2rem">GRIDS KYB Custodian by i4m Lab</p>
    </div>
    `,
  });
}

module.exports = {
  sendInvitationEmail,
};
