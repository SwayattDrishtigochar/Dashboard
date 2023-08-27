import express from 'express';
import {
  saveBoilerData,
  deleteBoilerData,
  editBoilerData,
  getBoilerData,
  getAllBoilerData,
  getWoodAmountForCurrentDay,
} from '../controllers/BoilerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/boiler', protect, getBoilerData);
router.get('/boiler/data', protect, getAllBoilerData);
//get wood amount for current day
router.get('/boiler/wood', protect, getWoodAmountForCurrentDay);
// Save boiler data
router.post('/boiler', protect, saveBoilerData);

// Delete boiler data by ID
router.delete('/boiler/:id', protect, deleteBoilerData);

// Edit boiler data by ID
router.put('/boiler/:id', protect, editBoilerData);

export default router;
