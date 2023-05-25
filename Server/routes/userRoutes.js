import express from 'express';
import {
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/user', protect, getUser);
router.put('/user', protect, updateUser);
router.delete('/user', protect, deleteUser);

export default router;
