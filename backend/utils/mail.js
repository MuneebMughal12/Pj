const nodemailer = require("nodemailer");

const mail = async (options) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g., smtp.gmail.com for Gmail
      port: process.env.SMTP_PORT, // 587 for TLS or 465 for SSL
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER, // Your email address
        pass: process.env.SMTP_PASSWORD, // Your email password or app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`, // Sender's name and email
      to: options.email, // Recipient's email
      subject: options.subject, // Email subject
      text: options.message, // Email body (plain text)
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to: ${options.email}`);
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw new Error("Email sending failed");
  }
};

module.exports = mail;
