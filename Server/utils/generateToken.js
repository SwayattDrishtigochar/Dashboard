import jwt from 'jsonwebtoken';

/**
 * @function generateToken
 * @description Generates a JSON Web Token (JWT) for the given user ID.
 * @param {object} res The response object.
 * @param {number} userId The ID of the user to generate a token for.
 * @returns {void}
 */
const generateToken = (res, userId) => {
  // Create a JWT with the user ID and an expiration of 1 day.
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  // Set a cookie with the JWT.
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    SameSite: 'strict',
    maxAge: 1 * 24 * 60 * 60 * 1000, //! cookie store for 1 day
  });
};

export default generateToken;
