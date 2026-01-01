import express from 'express';
import { verifyTokenAndAuthorization, verifyToken, verifyTokenAndAdmin } from './verifyToken.js';
import User from '../models/User.js';
import CryptoJS from "crypto-js";

const router = express.Router()

/*After verifying jsonwebtoken and userid or isAdmin */
/*User makes a request using jsonwebtoken in header and userId in url */
//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    /*It works only when password is sent*/
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        const { password, ...otherInfo } = user._doc
        res.status(200).json(otherInfo)
    } catch (error) {
        res.status(500).json(error)
    }
})


//GET ALL USERS
/*We just pass Bearer jsonwebtoken in header */
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})



router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const now = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(now.getFullYear() - 1);

    try {
        const data = await User.aggregate([
            /*$gte → filters by full date & time */
            //    { $match: { createdAt: { $gte: lastYear } } },
            /*$gte → filters by full date & time */
            //     { $project: { month: { $month: "$createdAt" } } },
            /*$group → counts per month */
            //     { $group: { _id: "$month", totalRegistersInMonth: { $sum: 1 } } }
             { $match: { createdAt: { $gte: lastYear } } },
              {
                  $project: {
                      year: { $year: "$createdAt" },
                      month: { $month: "$createdAt" }
                  }
              },
              {
                  $group: {
                      _id: {
                          year: "$year",
                          month: "$month"
                      },
                      totalRegistersInMonth: { $sum: 1 }
                  }
              },
              {
                  $sort: { "_id.year": 1, "_id.month": 1 }
              }
            
        ])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})


export default router