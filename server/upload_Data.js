// I have created this file to upload Holdings data from a JSON file to MongoDB using Mongoose.
// and this data is used in the frontend to display the portfolio.

import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import Holding from "./models/holding.js"; // path to your schema


dotenv.config();

const MONGODB_URI = process.env.MONGO_URI;
console.log("Connecting to MongoDB...: ", MONGODB_URI);
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

// Upload data from JSON
const uploadPortfolioData = async () => {
    try {
        const rawData = fs.readFileSync("portfolio.json"); 
        const data = JSON.parse(rawData);

        await Holding.deleteMany({});

        await Holding.insertMany(data);

        console.log("🎉 Holding data uploaded successfully");
    } catch (error) {
        console.error("❌ Error uploading holdings:", error);
    } finally {
        mongoose.connection.close();
    }
};

// Run script
(async () => {
    await connectDB();
    await uploadPortfolioData();
})();
