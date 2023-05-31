/**
 * @module Controller/Company
 * @author Sunny Vedwal
 */

import asyncHandler from 'express-async-handler';
import Company from '../models/companyModel.js';

/**
 * @description  This function allows the registration of a new company by providing the company name. It checks if a company with the same name already exists. If not, it creates a new company with the provided name and returns the newly registered company information.
 *
 * @function RegisterCompany
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Newly registered company information
 * @throws {Error} - If company already exists or invalid data
 */
const RegisterCompany = asyncHandler(async (req, res) => {
  const { name, location } = req.body;
  const companyExists = await Company.findOne({ name });
  if (companyExists) {
    res.status(400);
    throw new Error('Company already exists');
  }
  const company = await Company.create({
    name,
    location: [location],
  });
  if (company) {
    res.status(201).json({
      _id: company._id,
      name: company.name,
      location: company.location,
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

const getCompany = asyncHandler(async (req, res) => {
  const { companyId } = req.params;

  // Find the company by ID and populate the users and admins fields
  const company = await Company.findById(companyId)
    .populate('users')
    .populate('admins');

  if (company) {
    res.status(200).json(company);
  } else {
    res.status(404);
    throw new Error('Company not found');
  }
});

export { RegisterCompany, getCompany };
