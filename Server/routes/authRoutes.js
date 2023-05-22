import express from 'express';
const router = express.Router();
import {
  SigninUser,
  SignoutUSer,
  SignupUSer,
} from '../controllers/authController.js';

router.post('/signin', SigninUser);
router.post('/signup', SignupUSer);
router.post('/signout', SignoutUSer);

export default router;
