import express from "express"
import dotenv from "dotenv"
import mongoose  from "mongoose"
import bcrypt from "bcrypt"
import cors from "cors";
import cookieParser from "cookie-parser";


// IMPORT ROUTES
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js"
import favoritesRouter from "./routes/favorites.js";
// import sendFavoritesRouter from "./routes/display-favorites.js";
import tokenVerifyRouter from "./routes/verify-token.js";
import signOutRouter from "./routes/sign-out.js";
import profileInformationRouter from "./routes/profile-information.js"
import saveProfileRouter from "./routes/save-profile.js"
import resetPasswordRouter from "./routes/reset-password.js";


// RUN DOTENV
dotenv.config();

const app = express()

// APP ROUTES AND SUCH REQUIREMENTS
app.use(express.json())
app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(cookieParser())

app.use(registerRouter)
app.use(loginRouter)
app.use(favoritesRouter)
// app.use(sendFavoritesRouter)
app.use(tokenVerifyRouter)
app.use(signOutRouter);
app.use(profileInformationRouter);
app.use(saveProfileRouter);
app.use(resetPasswordRouter);

// CONNECT TO mongoDB

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to db");
})
.catch((err)=>{
    console.log("DB connection failed!", err);
    
})





// LISTEN TO PORT
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);
})

 