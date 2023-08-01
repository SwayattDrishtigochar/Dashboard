import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import Company from '../models/companyModel.js';
import Otp from '../models/OtpModel.js';

import { sendOtp } from './otpController.js';
// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sunnyvedwal@gmail.com',
    pass: 'uepoyghnamyzcsbw',
  },
});

const SigninUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      verified: user.verified,
      company: user.company,
      role: user.role,
      companyStatus: user.companyStatus,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

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
    // generateToken(res, user._id);
    sendOtp(user.email);
    const company = await Company.findById(user.company);
    if (company) {
      company.users.push(user._id);
      await company.save();
    } else {
      res.status(400);
      throw new Error('Company not found');
    }
    res.status(201).json({
      message: 'User Registered',
      data: {
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone: user.phone,
        verified: user.verified,
        company: user.company,
        role: user.role,
        companyStatus: user.companyStatus,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const SignoutUSer = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(200).json({ message: 'User logged out' });
});

export { SigninUser, SignupUSer, SignoutUSer };
