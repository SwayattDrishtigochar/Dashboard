import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import connectDB from './config/db.js';
// Set the port for the server
const port = process.env.PORT || 8000;

connectDB();

// Create an instance of Express application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * Middleware for handling authentication routes.
 * @name authRoutes
 * @type {import('express').Router}
 */
app.use('/api', authRoutes);
app.use('/api', otpRoutes);

/**
 * Middleware for handling user routes.
 * @name userRoutes
 * @type {import('express').Router}
 */
app.use('/api', userRoutes);

/**
 * Middleware for handling company routes.
 * @name companyRoutes
 * @type {import('express').Router}
 */
app.use('/api', companyRoutes);

/**
 * Route for the home page.
 * @name GET /
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 */

// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, 'client/dist')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
//   });
// } else {

// }

app.get('/', (req, res) => {
  // Send a response with the message "Server is ready"
  res.send('Server is ready');
});

/**
 * Middleware for handling 404 errors (route not found).
 * @name notFound
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 */
app.use(notFound);

/**
 * Middleware for handling errors.
 * @name errorHandler
 * @function
 * @memberof module:index
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 */
app.use(errorHandler);

/**
 * Start the server.
 * @name listen
 * @function
 * @memberof module:index
 * @param {number} port - The port number to listen on.
 * @param {function} callback - The callback function to execute when the server starts listening.
 */
app.listen(port, () => {
  // Log a message indicating that the server has started
  console.log(`Server is started on port ${port}`);
});
