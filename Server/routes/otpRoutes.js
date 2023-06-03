import express from 'express';
import { verifyOtp } from '../controllers/otpController.js';
const router = express.Router();

router.post('/verify', verifyOtp);

export default router;
