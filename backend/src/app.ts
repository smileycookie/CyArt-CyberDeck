import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import router from './routes';
import connectDB from './config/db';
import logger from './config/logger';
import errorHandler from './middleware/errorHandler';

const app = express();

// Database connection
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.API_RATE_LIMIT || '100')
});
app.use(limiter);

// Routes
app.use('/api', router);

// Error handling
app.use(errorHandler);

export default app;
