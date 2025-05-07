import express from "express";
import movieUser from "../models/userModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const router = express.Router();


router.post("/save-profile", async(req,res)=>{
    
    const token = req.cookies.token;

    jwt.verify(token,process.env.JWT_SECRET, async(err,decoded)=>{
        if(err){
            res.json({success: false, msg: "JWT not verified please login again!"})
        }

        const userObj = req.body

        const dbUser = await movieUser.findOne({username: decoded.username});


        if(dbUser.name !== userObj.name || dbUser.lastname !== userObj.lastname || dbUser.email !== userObj.email){
            dbUser.name = userObj.name
            dbUser.lastname = userObj.lastname
            dbUser.email = userObj.email
            await dbUser.save();
           return res.json({success: true, msg: "Information Updated Successfully !"})
        }

        res.json({success: false , msg:"Information could not be updated!"});

    })
    
    
    
   
    

});


export default router;
