const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080';
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.use((req, res, next) => {
	const ts = new Date().toISOString();
	console.log(`[${ts}] ${req.method} ${req.originalUrl}`);
	next();
});

connectDB(process.env.MONGO_URI);

const createAdminUser = require('./config/adminSeeder');
createAdminUser();

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/', (req, res) => res.send('Jobportal backend running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
