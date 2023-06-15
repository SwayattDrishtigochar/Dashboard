/**
 * @module routes/userRoutes
 * @author Sunny Vedwal
 *
 * This module defines the routes for the user resource.
 */

import express from 'express';
import {
  deleteUser,
  getUser,
  updateUser,
  forgetPassword,
  passwordReset,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

/**
 * @route GET /user
 * @description Get a user by ID.
 * @param {number} id The ID of the user to get.
 * @returns {User} The user object.
 */
router.get('/user', protect, getUser);

/**
 * @route PUT /user
 * @description Update a user.
 * @param {User} user The user object to update.
 * @returns {User} The updated user object.
 */
router.put('/user', protect, updateUser);

router.post('/user/forget-password', forgetPassword);
router.post('/user/:userId/:token', passwordReset);

/**
 * @route DELETE /user
 * @description Delete a user.
 * @param {number} id The ID of the user to delete.
 * @returns {boolean} Whether the user was deleted successfully.
 */
router.delete('/user', protect, deleteUser);

export default router;
