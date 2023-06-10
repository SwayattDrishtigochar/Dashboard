import express from 'express';
import { resendOtp, verifyOtp } from '../controllers/otpController.js';
const router = express.Router();

router.post('/verify', verifyOtp);
router.post('/resend-otp', resendOtp);

export default router;
