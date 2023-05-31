import express from 'express';
import {
  RegisterCompany,
  getCompany,
} from '../controllers/companyController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:companyId', protect, isAdmin, getCompany);

router.post('/company', RegisterCompany);

export default router;
