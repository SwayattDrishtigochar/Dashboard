import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized , no token');
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('No user found');
  }
  if (user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Not Authorized');
  }
});

export { protect, isAdmin };

//TODO: add admin protect functionality
