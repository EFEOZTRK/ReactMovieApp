import mongoose from "mongoose";

const movieUserSchema = mongoose.Schema({
    username: String,
    password: String,
    name: String,
    lastname: String,
    email: String,
    favorites: Array
})


const movieUser = new mongoose.model("movieUser",movieUserSchema);

export default movieUser;