/**
 * @module AuthController
 * @author Sunny Vedwal
 */

import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import Company from '../models/companyModel.js';
import Otp from '../models/OtpModel.js';
// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sunnyvedwal@gmail.com',
    pass: 'uepoyghnamyzcsbw',
  },
});

/**
 * @description This function authenticates the user with the provided email and password. If the authentication is successful, it generates a token and returns the user information along with the token.
 * @function SigninUser
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - User information and token
 * @throws {Error} - If invalid email or password
 */
const SigninUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      phone: user.phone,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/**
 * Register a new user
 * @description This function allows a new user to register by providing their name, company, email, and password. It checks if the user already exists and, if not, creates a new user with the provided information. Upon successful registration, it generates a token and returns the newly registered user information along with the token.
 * @function SignupUser
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Newly registered user information and token
 * @throws {Error} - If user already exists or invalid user data
 */
const SignupUSer = asyncHandler(async (req, res) => {
  const { fname, lname, phone, company, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    fname,
    lname,
    phone,
    company,
    email,
    password,
  });
  if (user) {
    sendOtpVerificationEmail(res, user);
    const company = await Company.findById(user.company);
    if (company) {
      company.users.push(user._id);
      await company.save();
    } else {
      res.status(400);
      throw new Error('Company not found');
    }
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * @description  This function logs out the user by clearing the JWT token stored in the cookie. After successful logout, it sends a success message.
 *
 * @function SignoutUser
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Success message
 */
const SignoutUSer = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(200).json({ message: 'User logged out' });
});

const sendOtpVerificationEmail = asyncHandler(async (res, user) => {
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  const mailOptions = {
    from: 'sunnyvedwal@gmail.com',
    to: user.email,
    subject: 'OTP Verification',
    text: `Your OTP is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending OTP:', error);
      return res.status(500).json({ error: 'Failed to send OTP' });
    }
    console.log('OTP sent:', info.response);
    res.status(201).json({ message: 'User registered successfully' });
  });

  const otpSave = new Otp({
    otp: otp,
    email: user.email,
  });
  await otpSave.save();
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const otpData = await Otp.findOne({ email });
  if (otpData && otpData.matchOtp(otp)) {
    const user = await User.findOne({ email });

    if (user) {
      //update the verified property to true
      user.verified = true;
      await user.save();

      generateToken(res, user._id);
      res.status(200).json({ message: 'User logged in successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } else {
    res.status(401);

    throw new Error('Invalid OTP');
  }
});

export { SigninUser, SignupUSer, SignoutUSer, verifyOtp };
