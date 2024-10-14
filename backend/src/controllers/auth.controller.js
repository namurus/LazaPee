import db from '@/database';
import createError from 'http-errors';
// [POST] /auth/login
export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// Find user by email address
		const user = await db.models.User.findOne({ where: { email } });
		if (!user) {
			return res.status(400).json({ code: 400, message: 'There is no user with this email address!' });
		}
		// Check user password
		const isValidPassword = await user.validatePassword(password);
		if (!isValidPassword) {
			return res.status(400).json({ code: 400, message: 'Incorrect password!' });
		}

		// Generate and return token
		return res.status(200).json({});
	} catch (err) {
		return next(err);
	}
};

// [POST] /auth/register
export const register = async (req, res, next) => {
	try {
		const { fullName, email, password } = req.body;
		// Check if user exists
		const userExists = await db.models.User.findOne({
			where: { email: email },
		});

		if (userExists) {
			return res.status(400).json({ code: 400, message: 'User already exists!' });
		}

		// Create user
		const user = await db.models.User.create({
			fullName: fullName,
			email: email,
			password: password,
		});

		// Generate and return tokens
		res.status(201).json({ user });
	} catch (err) {
		next(err);
	}
};
