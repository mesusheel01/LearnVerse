import {Router} from 'express'
import { signinValidator, signupValidator } from '../bodyValidator.js'
import { User } from '../db/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userCourseRouter from './userCourseRoute.js'
import purchaseRouter from './purchaseRoute.js'


const userRouter = Router()

// /signup route
userRouter.post('/signup', async(req,res)=>{
    const bodyToValidate = req.body

    const validation = signupValidator.safeParse(bodyToValidate)
    if(!validation.success){
        return res.status(400).json({
            msg: "Send correct inputs!"
        })
    }
    const {username, email, password} = bodyToValidate
    try{
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({
                msg: "User already exist!"
            })
        }
        const saltRounds = 11;
        const hasedPass = await bcrypt.hash(password, saltRounds)

        const newUser = await User.create({
            username,
            email,
            password: hasedPass
        })
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET)
        res.status(200).json({
            msg: "User created successfully!",
            token
        })
    }catch(err){
        res.json({
            msg: "Error during creating user!",
            error: err.message
        })
    }
})

//signin
userRouter.post('/signin', async(req,res)=>{
    const bodyToValidate = req.body

    const validation = signinValidator.safeParse(bodyToValidate)
    if(!validation.success){
        return res.status(400).json({
            msg: "Send correct inputs!"
        })
    }
    const {username, password} = bodyToValidate
    try{
        const existingUser = await User.findOne({username})
        if(!existingUser){
            return res.status(404).json({
                msg: "User does not exist. Please singup first"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordValid){
            return res.status(401).json({
                msg: "Invalid password!"
            })
        }
        console.log(username)
        const token = jwt.sign({userId: existingUser._id, username:username}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(200).json({
            msg: "User signined successfully!",
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
userRouter.use('/courses', userCourseRouter)
userRouter.use('/purchasedCourses', purchaseRouter)
export default userRouter
