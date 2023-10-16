import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Otp from '../models/OtpModel.js';
import generateToken from '../utils/generateToken.js';
import { sendEmail } from '../utils/sendEmail.js';

const sendOtp = asyncHandler(async (res, email) => {
  const otp = `${Math.floor(100000 + Math.random() * 9000)}`;

  try {
    sendEmail(res, email, 'OTP for email verification', `Your OTP is ${otp}`);
    Otp.create({
      email,
      otp,
      expireAt: addMinutesToDate(new Date(), 1),
      status: 'pending',
    });
  } catch (error) {
    res.status(500);
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const otpData = await Otp.findOne({
    email,
    status: 'pending',
  });
  if (otpData && otpData.otp === otp) {
    otpData.status = 'confirmed';
    await otpData.save();
    await User.updateOne(
      {
        email,
      },
      { $set: { verified: true } }
    );

    const user = await User.findOne({ email });
    if (user) {
      //update the verified property to true
      user.verified = true;
      await user.save();
      generateToken(res, user._id);
      res.status(200).json({ message: 'User email id verified' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } else {
    res.status(401);

    throw new Error('Invalid OTP');
  }
});

const addMinutesToDate = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

// const rejectPendingOTP = (username) => {
//   return OTPModel.updateMany(
//     { username, status: 'PENDING' },
//     { $set: { status: 'REJECTED' } }
//   );
// };

const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Delete all existing OTPs for the email
  await Otp.deleteMany({ email });

  // Call the sendOtp function to generate and send a new OTP
  sendOtp(email);

  res.status(200).json({ message: 'OTP has been resent' });
});

export { sendOtp, verifyOtp, resendOtp };
