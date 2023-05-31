/**
 * @module Model/Company
 * @author Sunny Vedwal
 */

import mongoose from 'mongoose';

/**
 * @typedef {Object} CompanySchema
 * @property {String} name - The name of the company.
 * @property {Date} createdAt - The timestamp when the company was created.
 * @property {Date} updatedAt - The timestamp when the company was last updated.
 * @todo Add more detials
 */

/**
 * Company Mongoose Schema
 *
 * @type {Schema<CompanySchema>}
 */
const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: [
      {
        type: String,
        required: true,
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model('Company', companySchema);

export default Company;
