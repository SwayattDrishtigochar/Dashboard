import jwt from 'jsonwebtoken';

const generateToken = async (res, userId) => {
  // Create a JWT with the user ID and an expiration of 1 day.
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  // Set a cookie with the JWT.
  res.cookie('jwt_token', token, {
    secure: true,
    httpOnly: true,
    SameSite: 'none',
  });
};

export default generateToken;
