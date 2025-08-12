import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import portfolioRoutes from "./routers/portfolioRoutes.js"; 
import performanceRoutes from "./routers/performanceRoutes.js";
dotenv.config();
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());    
 
// allow the cors for all origins
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/performance", performanceRoutes);

const MONGODB_URI = process.env.MONGO_URI;
console.log("Connecting to MongoDB...: ", MONGODB_URI);
// Connect to MongoDB
try {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
} catch (error) {
    console.error("❌ MongoDB connection error:", error);
}


// Start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
