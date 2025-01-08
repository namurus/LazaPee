import db from '@/database';
import sendMail from '@/helpers/sendMail';
import { v4 as uuidv4 } from 'uuid';
// [GET] /me
export const getMe = async (req, res) => {
	try {
		if (!req.user) {
			return res.status(404).json({ code: 404, message: 'User not found' });
		}
		return res.status(200).json({ code: 200, data: req.user });
	} catch (error) {
		return res.status(500).json({ code: 500, message: error.message });
	}
};

// [POST] /me/update
export const updateMe = async (req, res) => {
	try {
		const id = req.user.id;
		const { fullName, email, address, phone, avatar } = req.body;
		await db.models.User.update({ fullName, email, address, phone, avatar }, { where: { id } });
		const user = await db.models.User.findOne({ where: { id } });
		return res.status(200).json({ code: 200, data: user });
	} catch (error) {
		return res.status(500).json({ code: 500, message: error.message });
	}
};

// [POST] /user/password/forgot
export const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await db.models.User.findOne({ where: { email } });
		if (!user) {
			return res.status(404).json({ code: 404, message: 'User not found' });
		}
		// Send email to user
		const otp = Math.floor(100000 + Math.random() * 900000);
		const expiredAt = new Date();
		expiredAt.setMinutes(expiredAt.getMinutes() + 5);
		await db.models.ForgotPassword.create({ email, otp, expiredAt });
		// Send email
		const subject = 'OTP Code for Password Recovery';
		const html = `Your OTP code to recover your password is: <b>${otp}</b>. Please do not share it with anyone. Note that this code is valid for only 5 minutes.`;
		sendMail(email, subject, html);
		return res.status(200).json({ code: 200, message: 'Email sent' });
	} catch (error) {
		return res.status(500).json({ code: 500, message: error.message });
	}
};

// [POST] /user/password/otp
export const otp = async (req, res) => {
	try {
		const { email, otp } = req.body;

		const forgotPassword = await db.models.ForgotPassword.findOne({
			where: { email, otp },
			order: [['createdAt', 'DESC']],
		});

		if (!forgotPassword) {
			return res.status(404).json({ code: 404, message: 'OTP code is incorrect' });
		}

		const now = new Date();
		if (now > forgotPassword.expiredAt) {
			return res.status(400).json({ code: 400, message: 'OTP code is expired' });
		}

		const user = await db.models.User.findOne({ where: { email } });
		if (!user) {
			return res.status(404).json({ code: 404, message: 'User not found' });
		}

		const resetToken = uuidv4();
		await db.models.ForgotPassword.update({ resetToken }, { where: { id: forgotPassword.id } });

		return res.status(200).json({
			code: 200,
			message: 'OTP code is correct',
			resetToken,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ code: 500, message: 'Internal Server Error' });
	}
};

// [POST] /user/password/reset
export const resetPassword = async (req, res) => {
	try {
		const { resetToken, password } = req.body;

		const forgotPassword = await db.models.ForgotPassword.findOne({ where: { resetToken } });

		if (!forgotPassword) {
			return res.status(404).json({ code: 404, message: 'Invalid or expired reset token' });
		}

		const now = new Date();
		if (now > forgotPassword.expiredAt) {
			return res.status(400).json({ code: 400, message: 'Reset token has expired' });
		}

		const user = await db.models.User.findOne({ where: { email: forgotPassword.email } });
		if (!user) {
			return res.status(404).json({ code: 404, message: 'User not found' });
		}

		await user.update({ password });

		await db.models.ForgotPassword.destroy({ where: { resetToken } });

		return res.status(200).json({ code: 200, message: 'Password has been updated successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ code: 500, message: 'Internal Server Error' });
	}
};
