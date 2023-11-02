import express from 'express';
const router = express.Router();
import { getSensorData, getStatus } from '../controllers/sensorData.js';

router.get('/sensor', getSensorData);
router.get('/sensor/status', getStatus);

export default router;
