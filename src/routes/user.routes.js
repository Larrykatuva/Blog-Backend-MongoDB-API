import { UserController } from '../controllers';
import express from 'express';
const router = express.Router();

router.post('/signup', UserController.registerUser);
router.post('/login', UserController.loginUser);

export default router;