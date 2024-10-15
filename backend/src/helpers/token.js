import jwt from 'jsonwebtoken';
export const generateToken = (user) => { 
	const options = {
		expiresIn: '2 days',
	};
	const token = jwt.sign(user, process.env.JWT_SECRET_KEY, options);
	return token;
}
