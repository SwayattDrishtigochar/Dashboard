import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
// Set the port for the server
const port = process.env.PORT || 8000;

connectDB();

// Create an instance of Express application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', userRoutes);

// Route: GET /
// Description: Home route to check if the server is ready
app.get('/', (req, res) => {
  // Send a response with the message "Server is ready"
  res.send('Server is ready');
});

app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  // Log a message indicating that the server has started
  console.log(`Server is started on port ${port}`);
});
