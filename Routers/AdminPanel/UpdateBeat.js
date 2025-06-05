import express from "express";
import BeatsCollection from "../../Models/Beats.js";

const router = express.Router();

router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
const { title, genre, description, price, image } = req.body;

try {
    const beat = await BeatsCollection.findOneAndUpdate({_id:id},{title,genre,description,price,image},{new:true})
    if(!beat)return res.status(400).json({message:"Beat Not Found!",type:"error"});
    return res.status(200).json({beat,message:"Beat Updated Successfully!",type:"success",redirectUrl:"/"})
} catch (error) {
    console.log(error)
    
}
});

export default router;
