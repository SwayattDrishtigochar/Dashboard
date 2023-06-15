/**
 * @module Controller/User
 * @author Sunny Vedwal
 */
import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import User from '../models/userModel.js';
import Token from '../models/tokenModel.js';
import { sendEmail } from '../utils/sendEmail.js';

/**
 * @description Retrieves the profile information of the authenticated user.
 * @function getUser
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - User profile information
 * @throws {Error} - If user is not found or server error occurs
 */

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('company');
    if (user) {
      const populatedUser = {
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        phone: user.phone,
        email: user.email,
        company: user.company.name ? user.company.name : 'NA', // Assuming `name` is a property of the `Company` model
      };
      res.status(200).json(populatedUser);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error);
  }
});
/**
 * @description Updates the profile information of the authenticated user.
 * @function updateUser
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Updated user profile information
 * @throws {Error} - If user is not found
 */
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.fname = req.body.fname || user.fname;
    user.lname = req.body.lname || user.lname;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUSer = await user.save();
    res.status(200).json({
      _id: updatedUSer._id,
      fname: updatedUSer.fname,
      lname: updatedUSer.lname,
      email: updatedUSer.email,
      phone: updatedUSer.phone,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('No user with this email');
  }
  let token = await Token.findOne({
    userId: user._id,
  });
  if (!token) {
    token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
    }).save();
  }
  const link = `http://192.168.100.88:3000/password-reset/${user._id}/${token.token}`;
  await sendEmail(user.email, 'Password reset', link);
  res.status(200).json('password reset link sent to your email account');
});

const passwordReset = async (req, res) => {
  try {
    const { password } = req.body;

    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(400);
      throw new Error('Invalid Link or Expired');
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      res.status(400);
      throw new Error('Link Expired');
    }

    user.password = password;
    await user.save();

    await token.deleteOne();

    res.status(200).json('Success');
  } catch (error) {
    // console.log('Error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Deletes the profile of the authenticated user.
 * @function deleteUser
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {Error} - If user is not found or password does not match
 */
const deleteUser = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user._id);
  let confirmedDelete = await user.matchPassword(password);
  if (user && confirmedDelete) {
    await User.deleteOne({ _id: user._id });
    res.cookie('jwt', '', {
      expires: new Date(0),
      httpOnly: true,
    });
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { getUser, updateUser, deleteUser, forgetPassword, passwordReset };
