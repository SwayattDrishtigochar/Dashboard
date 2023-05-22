import asyncHandler from 'express-async-handler';

/*
 *@desc Get profile info
 *@access Private
 *route POST /api/user
 */
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Profile' });
});

/*
 *@desc Update profile info
 *@access Private
 *route POST /api/user
 */
const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Update Profile' });
});

/*
 !@desc Delete a user
 *@access Private
 *route POST /api/user
 */
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Delete User' });
});

export { getUser, updateUser, deleteUser };
