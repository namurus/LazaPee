import express from 'express';
import 'dotenv/config';
import db from '@/database';
import router from './routes/index.route';
import cors from 'cors';
import corsOptions from '@/config/cors';

const ping = async () => {
	try {
		await db.authenticate(); 
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error); 
	}
};

// Test connection
ping();

const app = express();
// parse application/json

app.use(express.json())
app.use(cors(corsOptions))

// routers
router(app) 

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const port = process.env.PORT; 
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
