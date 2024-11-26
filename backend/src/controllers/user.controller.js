import db from '@/database';
// [GET] /me
export const getMe = async (req, res) => {
	try {
		console.log(req.user);
		
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
		console.log(req.user);
	} catch (error) {
		return res.status(500).json({ code: 500, message: error.message });
	}
};


