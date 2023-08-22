import express from 'express';
import {
  getCompany,
  getRequests,
  actionRequest,
  getApprovedUsers,
} from '../controllers/companyController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/company/:companyId', protect, isAdmin, getCompany);

router.get('/company/:companyId/requests', isAdmin, getRequests);

router.put(
  '/company/:companyId/requests/:userId',
  protect,
  isAdmin,
  actionRequest
);

router.get(
  '/company/:companyId/users/approved',
  protect,
  isAdmin,
  getApprovedUsers
);

export default router;
