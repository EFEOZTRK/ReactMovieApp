import express from "express"
import movieUser from "../models/userModel.js"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/favorites" , async(req,res)=>{
    const movieObj = req.body;
    const token = req.cookies.token;

    jwt.verify(token,process.env.JWT_SECRET, async(err,decoded)=>{
        if(err){
            res.json({success:false,msg:"Jwt not verified"})
        }

            const username = decoded.username
            const findUser = await movieUser.findOne({username: username});
            
            if(!findUser){
                res.json({success: false , msg: "Please login"});
            }
    
            const duplicate =  findUser.favorites.find(fav =>
            fav.title == movieObj.title &&
            fav.img == movieObj.img &&
            fav.date == movieObj.date &&
            fav.vote == movieObj.vote 
        )
    
            if(!duplicate){
                await movieUser.updateOne({username: username}, {$push:{favorites: {title: movieObj.title , img: movieObj.img , date: movieObj.date , vote: movieObj.vote}}})
                res.json({success: true , msg: "Added to favorites"})
                console.log("Added to favorites");
                
            }else{
                res.json({success: false , msg: "Already added"})
                console.log("Already added");
                
            }

        
    
        
    })


    })
    

   




export default router;