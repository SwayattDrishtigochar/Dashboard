import express from 'express';
import {
  RegisterCompany,
  getCompany,
  getRequests,
  actionRequest,
} from '../controllers/companyController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/company/:companyId', protect, getCompany);

// router.post('/company', RegisterCompany);

router.get('/company/:companyId/requests', protect, getRequests);

router.put('/company/:companyId/requests/:userId', protect, actionRequest);

export default router;
