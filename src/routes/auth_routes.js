import { Router } from 'express';
import { vista_login, login, register } from '../controllers/auth_controller.js';

const router = Router();

router.get('/', vista_login);
router.post('/login', login);
router.post('/register', register);

export default router;
