import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

dotenv.config()
const router = express.Router()

//REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body

        const encrypted = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()
        const newUser = new User({
            username,
            email,
            password: encrypted
        })
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)
    }

})


//LOGIN
router.post("/login", async (req, res) => {
    try {
        const { username } = req.body

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(401).json({ err: "no user found" })
        }

        //This logic belongs to database
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (req.body.password !== decryptedPassword) {
            return res.status(401).json({ err: "wrong password" });
        }

        /**If everything is successful creating a jsonwebtoken */
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_KEY,
            { expiresIn: "3d" }

        )

        //Destructing
        const { password, ...others } = user._doc

        //spread operator passing token in user data as a property.
        res.status(200).json({ ...others, accessToken })

    } catch (error) {
        res.status(500).json(error)
    }
})

export default router