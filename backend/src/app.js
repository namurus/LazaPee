import express from 'express';
import 'dotenv/config';
import db from '@/database';
const app = express();


// Test connection
const ping = async () => {
	try {
		await db.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

ping();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
