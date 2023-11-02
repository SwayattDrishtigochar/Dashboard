import express from 'express';
const router = express.Router();
import {
  getRunningHours,
  getSensorData,
  getStatus,
} from '../controllers/sensorData.js';

router.get('/sensor', getSensorData);
router.get('/sensor/status', getStatus);
router.get('/sensor/runningtime', getRunningHours);

export default router;
