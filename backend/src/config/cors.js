const allowedOrigins = [
	'http://localhost:5173',
	'https://abc.vercel.app'
];

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
	exposedHeaders: ['Content-Length', 'Content-Type', 'token'],
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
