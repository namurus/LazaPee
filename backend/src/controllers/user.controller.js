import db from '@/database';
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
