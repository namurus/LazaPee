import { Router } from 'express';
import { login, register } from '../controllers/admin.controller';

import validate from '@/middlewares/validation';
import { loginRules, registerRules } from '@/validations/admin.validate';

const router = Router();

router.post('/login', validate(loginRules), login);

router.post('/register', validate(registerRules), register);

export default router;
