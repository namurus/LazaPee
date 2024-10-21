import { Router } from 'express';
import { login, register, createCategory } from '../controllers/admin.controller';

import validate from '@/middlewares/validation';
import { loginRules, registerRules,  createCategoryRules} from '@/validations/admin.validate';

const router = Router();

router.post('/auth/login', validate(loginRules), login);

router.post('/auth/register', validate(registerRules), register);

router.post('/category', validate(createCategoryRules), createCategory);

export default router;
