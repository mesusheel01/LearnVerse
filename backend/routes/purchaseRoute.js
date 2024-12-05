import { Router } from "express"
import { Purchase } from "../db/index.js"
import userMiddleware from "../middlewares/userMiddleware.js"

const purchaseRouter = Router()
purchaseRouter.use(userMiddleware)
//purchased courses route

purchaseRouter.get("/", async(req,res)=>{
    try{
        const courses = await Purchase.find({userId: req.userId})
        if(!courses){
            return res.status(409).json({
                msg: "No courses lets purchase and enjoy the learning!"
            })
        }
        res.status(201).json({
            courses
        })
    }catch(err){
        console.log("Error finding courses: ",err)
        res.status(500).json({
            msg: "Error connecting to db!"
        })
    }
})

export default purchaseRouter
