import express from 'express';
import { verifyTokenAndAuthorization, verifyToken, verifyTokenAndAdmin } from './verifyToken.js';
import CryptoJS from "crypto-js";
import Cart from '../models/Cart.js';

const router = express.Router()

//Get All cart
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const cart = await Cart.find()
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//It is to get user cart data by id
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId })
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})


//Any user can create his own cart(1)
//Inserting data
router.post("/", verifyToken, async (req, res) => {
    try {
        const cart = new Cart(req.body);
        const result = await cart.save()
        res.status(200).json(result); // ✅ one response
    } catch (error) {
        res.status(500).json(error);  // ✅ correct
    }
});


//To updatecart data
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true })
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})


//Delete Products data 
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})





export default router