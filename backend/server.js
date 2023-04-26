import process from 'node:process';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('port', PORT);

// Load environment variables from .env file to process.env
dotenv.config();

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((error) => {
    console.log(error);
  });

// Request Logger Middleware
if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Secure HTTP headers returned by Express app
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Routes
app.use('/api/users', userRoutes);

// Listening logger
app.listen(app.get('port'), () => {
  console.log(`App is listening to port ${app.get('port')}`);
});

export default app;
