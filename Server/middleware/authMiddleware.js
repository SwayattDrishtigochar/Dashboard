import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt_token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.params.companyId === req.user.company.toString()) {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403);
      throw new Error('Not Authorized');
    }
  } else {
    res.status(403);
    throw new Error('Not Authorized');
  }
});

const companyAuth = asyncHandler(async (req, res, next) => {
  if (req.params.companyId === req.user.company) {
    next();
  } else {
    res.status(403);
    throw new Error('Not Authorized');
  }
});

export { protect, isAdmin, companyAuth };
