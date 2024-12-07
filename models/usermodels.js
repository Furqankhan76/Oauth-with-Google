import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:true 
    },
    googleId:{
        type:String,
        required:true
    },
    profileImage: {
        type:String,
    }

})

const User = mongoose.model("User", userSchema)

export default User;