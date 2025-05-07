import express from "express";
import bcrypt from "bcrypt";
import movieUser from "../models/userModel.js";
import jwt from "jsonwebtoken"


const router = express.Router();


router.post("/reset-password", async(req,res)=>{

    const token = req.cookies.token;

    jwt.verify(token,process.env.JWT_SECRET, async (err,decoded)=>{

        if(err){
            res.json({success: false, msg:"JWT token not verified"})
        }

        const username = decoded.username;
        const passwordObj = req.body;

        const userObj = await movieUser.findOne({username: username});
        
        // match the front-end password with db password
        const matchPassword = await bcrypt.compare(passwordObj.password,userObj.password);

        if(matchPassword){

            if(passwordObj.first == passwordObj.second){
                //if new password fields are identical
                const hashPassword = await bcrypt.hash(passwordObj.first,10)
                userObj.password = hashPassword
                await userObj.save();
                res.json({success: true , msg:"Password changed successfully"});

            }else{
                //if somehow new password fields are still not identical
                res.json({success: false , msg:"New password fields not identical!"})
            }


        }else{
            // If current password didnt match the db password
            res.json({success: false, msg:"Current password is incorrect!"})
        }
        
        
        
    })
    


})


export default router;