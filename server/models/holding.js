// import mongoose from "mongoose";

// const portfolioSchema = new mongoose.Schema({
//     symbol: { type: String, required: true },
//     companyName: { type: String, required: true },
//     quantity: { type: Number, required: true },
//     avgPrice: { type: Number, required: true },
//     currentPrice: { type: Number, required: true },
//     sector: { type: String, required: true },
//     marketCap: { type: String, enum: ["Large", "Mid", "Small"], required: true },
//     exchange: { type: String, enum: ["NSE", "BSE"], required: true },
//     value: { type: Number, required: true },
//     gainLoss: { type: Number, required: true },
//     gainLossPercent: { type: Number, required: true }
// }, { timestamps: true });

// export default mongoose.model("Portfolio", portfolioSchema);


import mongoose from "mongoose";

const holdingSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    companyName: { type: String, required: true },
    quantity: { type: Number, required: true },
    avgPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    sector: { type: String, required: true },
    marketCap: { type: String, enum: ["Large", "Mid", "Small"], required: true },
    exchange: { type: String, enum: ["NSE", "BSE"], required: true },
    value: { type: Number, required: true },
    gainLoss: { type: Number, required: true },
    gainLossPercent: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Holding", holdingSchema);