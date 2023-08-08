import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import BoilerRoutes from './routes/BoilerRoute.js';
import connectDB from './config/db.js';
// Set the port for the server
const port = process.env.PORT || 8000;

connectDB();

// Create an instance of Express application
const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', otpRoutes);

app.use('/api', userRoutes);

app.use('/api', companyRoutes);
app.use('/api', BoilerRoutes);

// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, 'client/dist')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
//   });
// } else {
//   app.get('/', (req, res) => {
//     // Send a response with the message "Server is ready"
//     res.send('Server is ready');
//   });
// }

app.get('/', (req, res) => {
  // Send a response with the message "Server is ready"
  res.send('Server is ready');
});

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
  // Log a message indicating that the server has started
  console.log(`Server is started on port ${port}`);
});
