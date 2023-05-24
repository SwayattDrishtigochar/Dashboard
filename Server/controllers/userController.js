import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/*
 *@desc Get profile info
 *@access Private
 *route POST /api/user
 */
const getUser = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

/*
 *@desc Update profile info
 *@access Private
 *route POST /api/user
 */
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUSer = await user.save();
    res.status(200).json({
      _id: updatedUSer._id,
      name: updatedUSer.name,
      email: updatedUSer.email,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

/*
 !@desc Delete a user
 *@access Private
 *route POST /api/user
 */
const deleteUser = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user._id);
  let confirmedDelete = await user.matchPassword(password);
  if (user && confirmedDelete) {
    await User.deleteOne({ _id: user._id });
    res.cookie('jwt', '', {
      expires: new Date(0),
      httpOnly: true,
    });
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { getUser, updateUser, deleteUser };
