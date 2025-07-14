// server.js
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import bookingRoutes from './routes/bookingRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
connectDB();

app.use(cors({
  origin: ['book-number.vercel.app'], // 👈 your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json()); // Body parser

app.use('/api/bookings', bookingRoutes);

const  PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));