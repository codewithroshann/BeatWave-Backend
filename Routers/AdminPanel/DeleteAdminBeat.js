import express from "express"
import BeatsCollection from "../../Models/Beats.js"

const router = express.Router()
router.delete("/:id",async(req,res)=>{
    const {id}= req.params
  const beat = await BeatsCollection.findByIdAndDelete({_id:id})
  if(!beat)return res.status(400).json({message:"Beat Not Found!",type:"error"});
  return res.status(200).json({beat,message:"Beat Deleted Successfully!",type:"success"})

})


export default router