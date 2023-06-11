import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/app-data');
    console.log(`👻 Mongoose DB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);

  }

};


export default connectDB;
