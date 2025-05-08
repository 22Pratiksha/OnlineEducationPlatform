const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // Create transporter for Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail", // use Gmail service
      auth: {
        user: process.env.MAIL_USER, // your Gmail address
        pass: process.env.MAIL_PASS, // your App Password (not Gmail login)
      },
    });

    // Compose email
    const mailOptions = {
      from: `"Online Education Platform - by Pratiksha" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email send error:", error.message);
  }
};

module.exports = mailSender;
