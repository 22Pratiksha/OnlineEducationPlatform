const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // Create transporter for Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use Gmail service
      auth: {
        user: process.env.MAIL_USER, // Your Gmail address
        pass: process.env.MAIL_PASS, // Your App Password (not Gmail login password)
      },
    });

    // Compose email
    const mailOptions = {
      from: `"Online Education Platform - by Pratiksha" <${process.env.MAIL_USER}>`, // Display name with your email
      to: email,
      subject: title,
      html: body,
      headers: {
        'X-Priority': '1',  // Set high priority to avoid spam filters
        'Importance': 'High',  // Set email importance to high
      },
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;  // Return the email info in case you need to log or check
  } catch (error) {
    console.error("Email send error:", error.message);
    throw error;  // Optionally, rethrow the error to handle it elsewhere
  }
};

module.exports = mailSender;
