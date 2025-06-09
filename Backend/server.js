import 'dotenv/config'; // ✅ This must come BEFORE using process.env anywhere
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/userRoute.js";
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// Setup __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Static folder for uploaded images
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
connectDB();

// Routes
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

// Root route
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(port, () => {
    console.log(`🚀 Server started at http://localhost:${port}`);
});
