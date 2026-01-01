import express from 'express';
import { verifyTokenAndAuthorization, verifyToken, verifyTokenAndAdmin } from './verifyToken.js';
import CryptoJS from "crypto-js";
import Order from '../models/Order.js';

const router = express.Router()

//Get All orders
//Fetches all orders of all users (admin-only access).
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//It is to get user orders data by id(It will get user all orders)
//Fetches all orders of one specific user (only that user or an admin can access).

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const now = new Date();
    const previousMonth = new Date();
    previousMonth.setMonth(now.getMonth() - 2)
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ])
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json(error);
    }
})


//Any user can create his own order(1)
//Inserting data
router.post("/", verifyToken, async (req, res) => {
    try {
        const order = new Order(req.body);
        const result = await order.save()
        res.status(200).json(result); // ✅ one response
    } catch (error) {
        res.status(500).json(error);  // ✅ correct
    }
});


//To updatecart data
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const order = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true })
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
})


//Delete Products data 
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})





export default router