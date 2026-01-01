import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import registerRoute from "./routes/auth.js"
import productRoute from "./routes/product.js"
import orderRoute from "./routes/order.js";
import cartRoute from './routes/cart.js';
import cors from "cors";
import Razorpay from "razorpay"
import razorpayRoute from "./routes/razor.js"


dotenv.config();
const app = express()
app.use(express.json());// for JSON data
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // for form data

const MONGO_URL = process.env.MONGO_URL

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("DB Connection Successful!")
    } catch (error) {
        console.error("DB Connection Error:", error)
        process.exit(1); // stop app if DB fails
    }
}

connectDB()

app.use("/api/auth", registerRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/carts", cartRoute)
app.use("/api/payment",razorpayRoute)


export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})

app.post("/payment", (req, res) => {
    res.status(200).json({ success: true })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:3000`)
})