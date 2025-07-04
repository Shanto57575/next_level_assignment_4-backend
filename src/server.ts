import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3001;

const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(
      process.env.MONGODB_URL as string,
      {
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000,
      }
    );

    console.log(
      `MONGODB CONNECTED!!! CONNECTION HOST: ${dbConnection.connection.host}`
    );

    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING ON PORT : ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection error", error);
    process.exit(1);
  }
};

connectDB();
