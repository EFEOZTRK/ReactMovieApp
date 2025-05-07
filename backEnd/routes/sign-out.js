import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router();


router.get("/sign-out", async(req,res)=>{

    const token = req.cookies.token;

    if(!token){
        res.json({success: true, msg: "Already logged out"})
    }else{
        res.clearCookie("token")
        res.json({success: true, msg:"Logged out successfully"});
    }
    
    
    

})


export default router;