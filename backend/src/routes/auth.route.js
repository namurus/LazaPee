import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';

import validate from '@/middlewares/validation';
import { loginRules, registerRules } from '@/validations/auth.validate';

const router = Router();

router.post('/login', validate(loginRules), login);

router.post('/register', validate(registerRules), register);

export default router;
