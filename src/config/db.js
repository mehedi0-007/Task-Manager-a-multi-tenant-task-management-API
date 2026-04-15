import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb server connected with ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
