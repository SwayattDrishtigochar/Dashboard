import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    SameSite: 'strict',
    maxAge: 1 * 24 * 60 * 60 * 1000, //! cookie store for 1 day
  });
};

export default generateToken;
