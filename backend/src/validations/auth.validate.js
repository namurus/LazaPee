import { body } from "express-validator"
export const registerRules = [
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	body('fullName').exists(),
	body('username').exists().isLength({ min: 6 }),
	body('phone').exists().isLength({ min: 10 }),
]

export const loginRules = [
	body('username').exists().isLength({ min: 6 }),
	body('password').isLength({ min: 6 }),
]
