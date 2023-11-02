import express from 'express';
import {
  saveBoilerData,
  deleteBoilerData,
  editBoilerData,
  getBoilerData,
  getAllBoilerData,
  getWoodAmountForCurrentDay,
  getSteamPressureForCurrentDay,
  getWaterLevelForCurrentDay,
} from '../controllers/BoilerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/boiler', protect, getBoilerData);
router.get('/boiler/data', protect, getAllBoilerData);
//get wood amount for current day
router.get('/boiler/wood', protect, getWoodAmountForCurrentDay);
//get steam pressure for current day
router.get('/boiler/steam', protect, getSteamPressureForCurrentDay);
router.get('/boiler/water', protect, getWaterLevelForCurrentDay);
// Save boiler data
router.post('/boiler', protect, saveBoilerData);

// Delete boiler data by ID
router.delete('/boiler/:id', protect, deleteBoilerData);

// Edit boiler data by ID
router.put('/boiler/:id', protect, editBoilerData);

export default router;
