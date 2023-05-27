/**
 * @module Model/User
 * @author Sunny Vedwal
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * @typedef {Object} UserSchema
 * @property {String} name - The name of the user.
 * @property {ObjectId} company - The ID of the associated company.
 * @property {String} email - The email of the user.
 * @property {String} password - The hashed password of the user.
 * @property {('user'|'admin')} role - The role of the user.
 * @property {Date} createdAt - The timestamp when the user was created.
 * @property {Date} updatedAt - The timestamp when the user was last updated.
 */

/**
 * User Mongoose Schema
 *
 * @type {Schema<UserSchema>}
 */

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to hash the password
 *
 * @function
 * @name preSave
 * @param {Function} next - The next function to be called after pre-save operations.
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compare entered password with stored hashed password
 *
 * @function
 * @name matchPassword
 * @param {String} enteredPassword - The password entered by the user.
 * @returns {Promise<Boolean>} - A promise that resolves to true if the entered password matches the stored hashed password, or false otherwise.
 */

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * User Model Instance
 *
 * @instance
 */

const User = mongoose.model('User', userSchema);

export default User;
