import { body } from "express-validator"
export const registerRules = [
	body('password').isLength({ min: 6 }),
	body('fullName').exists(),
	body('username').exists().isLength({ min: 6 }),
]

export const loginRules = [
	body('username').exists().isLength({ min: 6 }),
	body('password').isLength({ min: 6 }),
]
