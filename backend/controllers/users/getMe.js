import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// @desc   Get user data
// @route  GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  // Get the details from the req based from the authorized user
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

export default getMe;
