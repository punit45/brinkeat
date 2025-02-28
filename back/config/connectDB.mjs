import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Check if MONGO_URL is not defined
if (!process.env.MONGO_URL) {
    throw new Error(
        "Please set your MONGO_URL in the .env file"
    );
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Successfully Connected 😃");
    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
}

export default connectDB;
