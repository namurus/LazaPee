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

export const createCategoryRules = [
	body('name').exists(),
	body('thumbnail').exists().isURL(),
]
export const createProductRules = [ 
	body('productName').exists(),
	body('price').exists().isNumeric(),
	body('description').exists(),
	body('thumbnail').exists().isURL(),
]
