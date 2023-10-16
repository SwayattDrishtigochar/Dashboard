import express from 'express';
import {
  registerEquipment,
  getAllEquipment,
  getEquipmentById,
} from '../controllers/equipmentController.js';

const router = express.Router();

router.get('/equipments', getAllEquipment);
router.get('/equipments/:id', getEquipmentById);
router.post('/equipments', registerEquipment);

export default router;
