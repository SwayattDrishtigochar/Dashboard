import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';

export const sendEmail = asyncHandler(async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const mailOptions = {
      from: 'sunnyvedwal@gmail.com',
      to: email,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);

    console.log('email sent sucessfully');
  } catch (error) {
    console.log(error, 'email not sent');
  }
});
