import express from 'express';
import {
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/userController.js';
const router = express.Router();

router.get('/user', getUser);
router.put('/user', updateUser);
router.delete('/user', deleteUser);

export default router;
