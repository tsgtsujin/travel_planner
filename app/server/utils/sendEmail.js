const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  // Gmail SMTP ашиглаж болно
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "travelly.planner@gmail.com", // өөрийн и-мэйл
      pass: "pdbu lnly dnxv nbxi", // gmail-н app password (2FA дээр үүсгэдэг)
    },
  });

  const mailOptions = {
    from: "travelly.planner@gmail.com",
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
