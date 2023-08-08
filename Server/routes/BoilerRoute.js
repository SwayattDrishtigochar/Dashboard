import express from 'express';
import {
  saveBoilerData,
  deleteBoilerData,
  editBoilerData,
  getBoilerData,
} from '../controllers/BoilerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/boiler', protect, getBoilerData);
// Save boiler data
router.post('/boiler', protect, saveBoilerData);

// Delete boiler data by ID
router.delete('/boiler/:id', protect, deleteBoilerData);

// Edit boiler data by ID
router.put('/boiler/:id', protect, editBoilerData);

export default router;
