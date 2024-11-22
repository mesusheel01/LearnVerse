import {Router} from 'express'
import { Course, Purchase } from '../db/index.js'
import userMiddleware from '../middlewares/userMiddleware.js'


const purchaseRouter = Router()

purchaseRouter.use(userMiddleware)

// course purchasing route for courses
// get/ users/coruses
purchaseRouter.get('/', async(req, res)=>{
    try{
        const courses = await Course.find({})
        res.status(200).json({
            courses
        })
    }catch(err){
        res.status(500).json({
            msg: "Something is up with the server!"
        })
    }
})

// /courses/:id post req to purchase course with given id
purchaseRouter.post('/:courseId', async (req,res)=>{
    const {courseId} = req.params
    const userId = req.userId
    try{
        const existingPurchase = await Purchase.findOne({ courseId: courseId, userId: req.userId })
        if(existingPurchase){
            return res.status(409).json({
                msg: "Course already purchased!"
            })
        }
        const newPurchase = await Purchase.create({
            userId,
            courseId,
            purchasedDate: new Date()
        })
        console.log("Purchase successfull!")
        res.status(201).json({
            msg: "Purchase Successfull!",
            purchase: newPurchase
        })
    }catch(err){
        console.log("Error purchasing course!: ", err)
        res.status(500).json({
            msg: "Error purchasing course!",
            error: err.message
        })
    }
})

//purchased courses route
purchaseRouter.get("/purchasedCourses", async(req,res)=>{
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
