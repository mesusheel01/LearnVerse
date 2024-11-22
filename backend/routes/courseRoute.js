import {Router} from 'express'
import { courseValidator } from "../bodyValidator.js"
import { Course } from "../db/index.js"
import adminMiddleware from '../middlewares/adminMiddleware.js'

const courseRouter = Router()

courseRouter.use(adminMiddleware)

//api to get all the courses
courseRouter.get('/',  async (req,res)=>{
    try{
        const courses = await Course.find({adminId: req.adminId})
        res.status(200).json({
            courses: courses
        })
    }catch(err){
        res.status(500).json({
            msg: "Error finding courses!"
        })
    }
})


//api for course creation

courseRouter.post('/', async (req, res) => {
    const bodyToValidate = req.body;
    const validation = courseValidator.safeParse(bodyToValidate);
    if (!validation.success) {
        return res.status(401).json({ msg: "Send correct input!" });
    }
    const { title, description, price, imageUrl } = bodyToValidate;
    try {
        const existingCourse = await Course.findOne({ title, adminId: req.adminId });
        if (existingCourse) {
            return res.status(409).json({ msg: "Course exists with the same name in Db!" });
        }
        const newCourse = await Course.create({
            title,
            description,
            price,
            imageUrl,
            courseBy: req.username,
            adminId: req.adminId
        });
        res.status(200).json({
            msg: "Course created successfully!",
            newCourse });
    } catch (err) {
        res.status(500).json({
            msg: "Something is up with the server!",
            error: err.message
        });
    }
});

//api for find by id
courseRouter.get('/:id', async (req,res)=>{
    const {id} = req.params
    try{
        const course = await Course.findById(id)
        if(!course){
            return res.status(401).json({
                msg: "No course exist with this id!"
            })
        }
        res.status(200).json({
            msg: "success",
            course: course
        })
    }catch(err){
        res.status(500).json({
            msg: "Server issue!"
        })
    }
})

//api for updating course

courseRouter.put('/:id' , async(req,res)=>{
    const bodyToValidate = req.body
    const validation = courseValidator.safeParse(bodyToValidate)
    if(!validation.success){
        res.status(401).json({
            msg:"Send correct input!"
        })
    }
    const {title, description, price, imageUrl }= bodyToValidate
    const {id} = req.params
    try{

        const existingCourse = await Course.findById(id)
        if(!existingCourse){
            return res.json({
                msg: "No course with the given id to update!"
            })
        }
         await Course.updateOne({_id: id},{
            title,
            description,
            price,
            imageUrl,
            courseBy: req.username,
            adminId: req.adminId
        })
        res.status(200).json({
            msg: "Course updated successfully!",
        })
    }catch(err){
        res.status(500).json({
            msg: "Something is up with server!"
        })
    }
})


export default courseRouter
