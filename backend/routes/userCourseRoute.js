import {Router} from 'express'
import { Course, Purchase } from '../db/index.js'
import userMiddleware from '../middlewares/userMiddleware.js'


const userCourseRouter = Router()

userCourseRouter.use(userMiddleware)

// course purchasing route for courses
// get/ users/coruses
userCourseRouter.get('/', async(req, res)=>{
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





//global route for user to view particular clicked course
userCourseRouter.get("/:id", async(req,res)=>{
    const {id} = req.params

    try{
        const course = await Course.findById(id)
        if(!course){
            return res.status(204).json({
                msg: 'Course with id not found!'
            })
        }
        res.status(200).json({
            course
        })
    }catch(err){
        res.status(500).json({
            msg: "Internal server Error!",
            error: err.message
        })
    }
})

// /cousrses/:id post req to purchase course with given id
userCourseRouter.post('/:courseId', async (req,res)=>{
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


export default userCourseRouter
