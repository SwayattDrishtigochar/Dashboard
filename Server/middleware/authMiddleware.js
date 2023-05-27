/**
 * @module Middleware/Auth
 * @author Sunny Vedwal
 */

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/**
 *@description Protects routes by verifying the JWT token.
 *
 * @function protect
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next function to continue to the next middleware/route handler
 * @throws {Error} - If the user is not authorized (no token or invalid token)
 */
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

/**
 * @description Checks if the user is an admin.
 *
 * @function isAdmin
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next function to continue to the next middleware/route handler
 * @throws {Error} - If no user is found or if the user is not authorized
 */
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
