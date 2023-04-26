import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';
import generateToken from './generateToken.js';

// @desc   Authenticat a user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Throw an error if fiels are missing
  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter email and password');
  }

  // Check for user email
  const user = await User.findOne({ email });

  // Throw an error if no user/email exists
  if (!user) {
    res.status(400);
    throw new Error('Invalid email');
  }

  // Compare hashed password to password from the user
  const comparePassword = await bcrypt.compare(password, user.password);

  if (comparePassword === false) {
    res.status(400);
    throw new Error('Invalid password');
  }

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

export default loginUser;
