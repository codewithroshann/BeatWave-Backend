import express from "express";
import islogedIn from "../../Middleware/UserAuthentication.js"
import BeatsCollection from "../../Models/Beats.js";

const router = express.Router();

router.get("/beats",async (req, res) => {
try {
    const beats = await BeatsCollection.find();
    return res.status(200).json({beats});
}
catch(error){
    console.log(error)
}
});
export default router