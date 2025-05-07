import express from "express"
import movieUser from "../models/userModel.js"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const router = express.Router();




router.post("/profile-information", async (req,res)=>{

   const username = req.body.username;

   const findUser = await movieUser.findOne({username: username});

   const profileInfo = {

    username: findUser.username,
    name: findUser.name,
    lastname: findUser.lastname,
    email: findUser.email,
    favorites: findUser.favorites
    
};
   
   res.json({profileInfo, success: true});
   

    

    
    

})


export default router;