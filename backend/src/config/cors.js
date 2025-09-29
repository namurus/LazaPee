export default {
	origin: process.env.CORS_ALLOWED_ORIGIN,
	optionsSuccessStatus: 200,
	allowedHeaders: ['Content-Type', 'Authorization'],
	exposedHeaders: ['Content-Length', 'Content-Type', 'token'],
};
