import { request } from 'express'
import mongoose from 'mongoose'
const {Schema} = mongoose
const UserSchema = new Schema({
    fullName:{
        type:String,
       required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phone:{
      type:Number  ,
      required:true
    },
    password: {
        type: String,
        required: true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
        request:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
const User = mongoose.model('user',UserSchema)
export default User