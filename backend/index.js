import express from 'express'
import dotenv from 'dotenv'
import adminRouter from './routes/adminRoute.js'
import userRouter from './routes/userRoute.js'
import publicCourseRouter from './routes/publicCourseRoute.js'
dotenv.config()

const app = express()

//middleware to accept json body by express
app.use(express.json())

//admin routes will go to admin router middleware
app.use('/api/admin', adminRouter)

//user route will go to user middleware and purchasing and getting their courses will be handlded
app.use('/api/user', userRouter)

// public coures view route
app.use('/api/courses', publicCourseRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening at http://localhost:${process.env.PORT}`)
})
