import mongoose from 'mongoose';

/**
 * Connects to MongoDB database.
 * @async
 * @function connectDB
 * @returns {Promise<void>} A Promise that resolves when the database connection is established.
 * @throws {Error} If the database connection fails.
 */

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
