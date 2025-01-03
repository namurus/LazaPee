import jwt from 'jsonwebtoken';
import db from '@/database';
export default async (req, res, next) => {
	const authorization = req.headers.authorization;
	if (!authorization) {
		return res.status(401).json({ code: 401, message: 'Unauthorized' });
	}
	if (!authorization.startsWith('Bearer')) {
		return res.status(401).json({ code: 401, message: 'Unauthorized' });
	}
	try {
		const token = authorization.split(' ')[1];
		const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		const user = await db.models.User.findOne({
			where: { id: tokenDecoded.id },
			attributes: {
				exclude: ['password'],
			},
		});
		if (!user) {
			return res.status(401).json({ code: 401, message: 'Unauthorized' });
		}
		req.user = user;
		
		next();
	} catch (err) {
		return res.status(401).json({ code: 401, message: 'Unauthorized' });
	}
};
