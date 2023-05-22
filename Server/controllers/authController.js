import asyncHandler from 'express-async-handler';

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
  res.status(200).json({ message: 'User Registered' });
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
