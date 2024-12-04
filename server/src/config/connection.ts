import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Wrap Mongoose around local connection to MongoDB
//mongoose.connect(process.env.MONGO_URI);
const MONGODB_URI = process.env.MONGODB_URI || '';

// Export connection
//export default mongoose.connection;
const db = async (): Promise<typeof mongoose.connection> => {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('Database connected.');
      return mongoose.connection;
    } catch (error) {
      console.error('Database connection error:', error);
      throw new Error('Database connection failed.');
    }
  };
  
  export default db;