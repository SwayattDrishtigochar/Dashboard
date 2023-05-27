import express from 'express';
import { RegisterCompany } from '../controllers/companyController.js';

const router = express.Router();

router.post('/company', RegisterCompany);

export default router;
