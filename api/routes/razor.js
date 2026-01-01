import express from "express"
import { instance } from "../index.js"
import dotenv from 'dotenv';
import crypto from "crypto";

dotenv.config();
const router = express.Router()

/*Creating an order */
router.post("/process", async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR"

    }
    const order = await instance.orders.create(options)
    res.status(200).json(({ success: true, order }))
})

router.get("/getKey", (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY
    })
})

router.post("/paymentVerification", (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex")

    const isAuthentic = expectedSignature === razorpay_signature
    if (isAuthentic) {
        return res.redirect(`http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`)
    } else {
        res.status(404).json({
            success: false
        })
    }

})

export default router


