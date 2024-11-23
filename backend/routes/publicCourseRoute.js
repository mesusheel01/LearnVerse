import {Router} from 'express'
import { Course } from '../db/index.js'


const publicCourseRouter = Router()

//basic get route for course so that public can view and purchase it

publicCourseRouter.get('/', async(req,res)=>{
    try{
        const courses = await Course.find({})
        if(courses.length === 0){
            res.status(204).json({
                msg: "No courses avalable to view!"
            })
        }
        res.status(200).json({
            courses
        })
    }catch(err){
        res.status(500).json({
            msg: "Server Error!"
        })
    }
})


export default publicCourseRouter
