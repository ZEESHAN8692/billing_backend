import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};

export default connectDB;
