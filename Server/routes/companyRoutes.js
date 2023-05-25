import express from 'express';
import { CreateCompany } from '../controllers/companyController.js';

const router = express.Router();

router.post('/company', CreateCompany);

export default router;
