import 'dotenv/config';
const { DB_HOST, DB_PORT = 23332, DB_DATABASE, DB_USER, DB_PASSWORD, DB_SSL = 'false' } = process.env;

const defaultConfig = {
	dialect: 'mysql',
	timezone: '+07:00',
	username: DB_USER,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	host: DB_HOST,
	port: Number(DB_PORT),
	define: {
		paranoid: true,
	},
};

if (DB_SSL == 'true') {
	defaultConfig.dialectOptions = {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	};
}

export const development = {
	...defaultConfig,
};
