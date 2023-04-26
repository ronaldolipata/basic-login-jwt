import { Router } from 'express';
import registerUser from '../controllers/users/registerUser.js';
import loginUser from '../controllers/users/loginUser.js';
import getMe from '../controllers/users/getMe.js';
import protect from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;
