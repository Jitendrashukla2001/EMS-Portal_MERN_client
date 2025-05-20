import mongoose, { Mongoose } from "mongoose";
// import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: {
        type: String, required: true
    },
    status:{
        type:String,
        enum:["pending","success"],
        default:"pending"
    }
})

export const User=mongoose.model("User",UserSchema)