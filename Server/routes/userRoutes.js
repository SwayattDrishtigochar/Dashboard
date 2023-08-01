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

router.get('/user', protect, getUser);

router.put('/user', protect, updateUser);

router.post('/user/forget-password', forgetPassword);
router.post('/user/:userId/:token', passwordReset);

// router.delete('/user', protect, deleteUser);

export default router;
