import jwt from 'jsonwebtoken';

const generateToken = async (res, userId) => {
  try {
    // Create a JWT with the user ID and an expiration of 1 day.
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Set a cookie with the JWT.
    await res.cookie('jwt_token', token, {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
  } catch (error) {
    // Handle any errors that might occur during token generation or cookie setting
    console.error('Error generating token:', error);
    // You can choose to throw the error or handle it in some other way
    throw new Error('Error generating token: ' + error.message);
  }
};

export default generateToken;
