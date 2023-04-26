import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  // Throw an error if the header does not contain a token or
  // the token does not starts with word 'Bearer'
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  // Get token from the header
  // Split the header to remove the space which will then make it into array
  // to get the actual token
  const token = req.headers.authorization.split(' ')[1];

  // Throw an error if the there is no token after the 'Bearer'
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token, and set it to req.user
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error('Not authorized');
  }
});

export default protect;
