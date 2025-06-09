import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/FoodDel");
        
        console.log("✅ Connected to MongoDB - FoodDel");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};
