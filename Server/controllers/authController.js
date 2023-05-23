import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/*
 *@desc Auth user / set token
 *@access Public
 *route POST /api/signin
 */
const SigninUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Auth User' });
});

/*
 *@desc Register a new user
 *@access Public
 *route POST /api/signup
 */
const SignupUSer = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const useExists = await User.findOne({ email });
  if (useExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/*
 *@desc Logout user
 *@access Public
 *route POST /api/signout
 */
const SignoutUSer = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User logged out' });
});

export { SigninUser, SignupUSer, SignoutUSer };
