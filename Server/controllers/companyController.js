import asyncHandler from 'express-async-handler';
import Company from '../models/companyModel.js';

const CreateCompany = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const companyExists = await Company.findOne({ name });
  if (companyExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const company = await Company.create({
    name,
  });
  if (company) {
    res.status(201).json({
      _id: company._id,
      name: company.name,
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

export { CreateCompany };
