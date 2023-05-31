/**
 * @module routes/authRoutes
 * @author Sunny Vedwal
 */

/**
 * Import the Express library.
 * @requires express
 * @see https://expressjs.com/en/api.html
 */
import express from 'express';
const router = express.Router();

/**
 * Import the `SigninUser`, `SignoutUser`, and `SignupUser` controllers.
 * @see module:AuthController
 */
import {
  SigninUser,
  SignoutUSer,
  SignupUSer,
  verifyOtp,
} from '../controllers/authController.js';

/**
 * @description Route for user sign-in
 * @route POST /signin
 * @see module:AuthController
 * @function
 * @memberof module:routes/authRoutes
 * @param {function} SigninUser - Controller function for handling user sign-in
 */
router.post('/signin', SigninUser);

/**
 * @description Route for user sign-up
 * @route POST /signup
 * @see module:AuthController
 * @function
 * @memberof module:routes/authRoutes
 * @param {function} SignupUSer - Controller function for handling user sign-up
 */
router.post('/signup', SignupUSer);

/**
 * @description Route for user sign-out
 * @route POST /signout
 * @see module:AuthController
 * @function
 * @memberof module:routes/authRoutes
 * @param {function} SignoutUSer - Controller function for handling user sign-out
 */
router.post('/signout', SignoutUSer);

router.post('/verify', verifyOtp);

export default router;
