import jwt from "jsonwebtoken";
import express from "express";
import movieUser from "../models/userModel.js";

const router = express.Router();


router.get("/verify-token", async (req,res)=>{

    const token = req.cookies.token
    
    jwt.verify(token,process.env.JWT_SECRET, (err, decoded)=>{

        if(err){
            res.clearCookie("token")
            res.json({success:false,msg:"Token not verifed or expired"})
        }else{
            const username = decoded.username;
            res.json({success: true, msg:"Token verified", username: username})
            
        }
    
    })
    
})



export default router;