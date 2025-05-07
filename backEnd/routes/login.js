import express from "express"
import bcrypt from "bcrypt"
import movieUser from "../models/userModel.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookie from "cookie-parser";


const router = express.Router();
dotenv.config();
router.use(cookie())

router.post("/login", async (req,res)=>{
    try{
        // Checking if both fields are not empty if empty return error message 
        // if not I find the username. if not matching username return error message
        // if username match then match the passsword if psw dont match return error message
        // if password match then user logs in successfully and return successfull message adding JWT as a cookie

        const loginData = req.body 
        
        // If input fields are both filled
        if(loginData.username && loginData.password){

            const findUser = await movieUser.findOne({username: loginData.username});

            // If the body username matches the db .
            if(findUser){
                const matchPassword = await bcrypt.compare(loginData.password , findUser.password)

                
                // If password matches.
                if(matchPassword){
                    // In successfull login I create a jwt token .

                    const token = jwt.sign(
                        {username: findUser.username , userId: findUser._id},
                        `${process.env.JWT_SECRET}`,
                        {expiresIn: "1h"}
                    );
                    
                    
                    // Create a cookie to send the JWT token.
                    
                    res.cookie("token", token,{
                        httpOnly: true,
                        secure: false,
                        sameSite: "lax",
                        maxAge: 3600000
                    });
                    


                    
                    res.json({success: true, message: "You have successfully logged in", username: findUser.username})


                }else{
                    //If password doesnt match
                    res.json({success: false, message: "Username or Password incorrect"})
                }




            }else{
                // If no user is found 
                res.json({success: false, message: "Username or Password incorrect"})
            }





            
        }else{
            // If one or both input fields are empty
            res.json({success: false, message: "Please fill both fields"})
        }
        

    }
    catch(err){

    }
})

export default router;