import db from '@/database';
import { Op } from 'sequelize';
// [POST] /auth/login
export const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		// Find user by email address
		const user = await db.models.User.findOne({ where: { username } });
		if (!user) {
			return res.status(400).json({ code: 400, message: 'There is no user with this email address!' });
		}
		// Check user password
		const isValidPassword = await user.validatePassword(password);
		if (!isValidPassword) {
			return res.status(400).json({ code: 400, message: 'Incorrect password!' });
		}

		// Generate and return token
		const token = user.generateToken();
		return res.status(200).json({ code: 200, token });
	} catch (err) {
		return next(err);
	}
};

// [POST] /auth/register
export const register = async (req, res, next) => {
	try {
		const { fullName, username, email, password, phone, role } = req.body;
		// Check if user exists
		const userExists = await db.models.User.findOne({
			where: {
				[Op.or]: [{ username: username }, { email: email }],
			},
		});

		if (userExists) {
			return res.status(400).json({ code: 400, message: 'User already exists!' });
		}

		// Create user
		const user = await db.models.User.create({
			fullName: fullName,
			email: email,
			password: password,
			username: username,
			phone: phone,
			role: role,
		});

		// Generate and return tokens
		const token = user.generateToken();
		return res.status(201).json({ code: 201, token });
	} catch (err) {
		next(err);
	}
};
