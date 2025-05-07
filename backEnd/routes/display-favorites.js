// import express from "express";
// import movieUser from "../models/userModel.js";

// const router = express.Router()


// router.post("/display-favorites", async (req,res)=>{
//     const username = req.body;
    
    
//     if(!username.username){
//         res.json({success: false, msg: "User not logged in!"})
//     }

//     const findFavorites = await movieUser.findOne({username: username.username});

//     if(!findFavorites.favorites){
//         res.json({success: false , msg: "You didn't add anything here yet"})
//     }


//     const sendMovieArray = JSON.stringify(findFavorites.favorites)
//     res.json({sendMovieArray});
    
//     console.log(sendMovieArray);
    
    


// })




// export default router;

