import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDb from './config/db.js';
import userRoute from './routes/userRoute.js'


const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/user', userRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on http://localhost:${PORT}`);
});
