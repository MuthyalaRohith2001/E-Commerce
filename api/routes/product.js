import express from 'express';
import { verifyTokenAndAuthorization, verifyToken, verifyTokenAndAdmin } from './verifyToken.js';
import CryptoJS from "crypto-js";
import Product from './../models/Product.js';

const router = express.Router()

//get all products (or)Get the latest products (or) get the products by category
/*We just pass Bearer jsonwebtoken in header */
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew==="true") {
            products = await Product.find().sort({ createdAt: -1 }).limit(5)
        }
        else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            })
        }
        else {
            products = await Product.find()
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})

//It is to get product data by id
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})


//To insert product data
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const product = new Product(req.body);

        const result = await product.save();
        console.log(result)
        // ✅ one response
    } catch (error) {
        res.status(500).json(error);  // ✅ correct
    }
});


//To updateproduct data
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true })
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})


//Delete Products data
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})





export default router