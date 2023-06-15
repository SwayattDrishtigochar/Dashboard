import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sunnyvedwal@gmail.com',
        pass: 'uepoyghnamyzcsbw',
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
};
