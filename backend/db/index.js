import mongoose from "mongoose";
import  dotenv  from "dotenv";
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to db")
}).catch((err)=>{
    console.log("Connection to db failed due to : ", err)
})

const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const adminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const courseSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    courseBy: {
        type: String,
        required: true
    },
    adminId: {
        type: ObjectId,
        ref: 'Admin',
        required: true
    }
})

const purchaseSchema = new Schema({
    userId:{
        type: ObjectId,
        ref: 'User',
        required: true
    },
    courseId:{
        type: ObjectId,
        ref: 'Course',
        required: true
    },
    purchasedDate:{
        type: Date,
        default: Date.now
    }
})


const User = mongoose.model('User', userSchema)
const Admin = mongoose.model('Admin', adminSchema)
const Course = mongoose.model('Course', courseSchema)
const Purchase = mongoose.model('Purchase', purchaseSchema)

export {
    User, Admin, Course, Purchase
}
