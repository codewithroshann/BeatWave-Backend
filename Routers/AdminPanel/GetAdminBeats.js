import express from "express"
import BeatsCollection from "../../Models/Beats.js"
import mongoose from "mongoose"
const router =  express.Router()

router.get("/:value",async(req,res)=>{
    const {value} = req.params
    const beat = await BeatsCollection.find({_id:new mongoose.Types.ObjectId(value)})
    if(!beat)return res.status(400).json({message:"Beat Not Found!",type:"error"});
    return res.status(200).json({beat})
})

export default router