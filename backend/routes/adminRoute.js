import {Router} from 'express'
import { signinValidator, signupValidator } from '../bodyValidator.js'
import { Admin } from '../db/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import adminCourseRouter from './adminCourseRoute.js'


const adminRouter = Router()

// /signup route
adminRouter.post('/signup', async(req,res)=>{
    const bodyToValidate = req.body

    const validation = signupValidator.safeParse(bodyToValidate)
    if(!validation.success){
        return res.status(400).json({
            msg: "Send correct inputs!"
        })
    }
    const {username, email, password} = bodyToValidate
    try{
        const existingAdmin = await Admin.findOne({email})
        if(existingAdmin){
            return res.status(409).json({
                msg: "Admin already exist!"
            })
        }
        const saltRounds = 11;
        const hasedPass = await bcrypt.hash(password, saltRounds)

        const newAdmin = await Admin.create({
            username,
            email,
            password: hasedPass
        })
        const token = jwt.sign({adminId: newAdmin._id}, process.env.JWT_SECRET)
        res.status(200).json({
            msg: "Admin created successfully!",
            token
        })
    }catch(err){
        res.json({
            msg: "Error during creating admin!",
            error: err.message
        })
    }
})

//signin
adminRouter.post('/signin', async(req,res)=>{
    const bodyToValidate = req.body

    const validation = signinValidator.safeParse(bodyToValidate)
    if(!validation.success){
        return res.status(400).json({
            msg: "Send correct inputs!"
        })
    }
    const {username, password} = bodyToValidate
    try{
        const existingAdmin = await Admin.findOne({username})
        if(!existingAdmin){
            return res.status(404).json({
                msg: "User does not exist. Please singup first"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, existingAdmin.password)
        if(!isPasswordValid){
            return res.status(401).json({
                msg: "Invalid password!"
            })
        }
        console.log(username)
        const token = jwt.sign({adminId: existingAdmin._id, username:username}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(200).json({
            msg: "Admin signined successfully!",
            token
        })
    }catch(err){
        res.status(500).json({
            msg: "Error during singing in!",
            error: err.message
        })
    }
})

//routing for creating and updating courses by admin
adminRouter.use('/courses', adminCourseRouter)

export default adminRouter
