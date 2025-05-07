import express from "express";
import bcrypt, { genSalt } from "bcrypt"
import movieUser from "../models/userModel.js"

const router = express.Router();


router.post("/register", async(req,res)=>{
    try{
        const data = req.body
        
        if(data.username && data.password){
            
            const findUsername = await movieUser.findOne({username: data.username})

            if(!findUsername){

            const hashedPassword = await bcrypt.hash(data.password,10);
            const Credentials = {username: data.username,password: hashedPassword};
            const newUser  = new movieUser(Credentials)
            await newUser.save()
            res.json({success: true, message: "You have registered Successfully"})
            
        }else{
            res.json({success: false,  message: "Username already in use!"})
        }


            

        }else{
            res.json({success: false , message: "Please fill both fields!"})
        }
        
        
        
    }
    catch(err){
        console.log("Server is busy please try again later!");
        
    }
})


export default router;