import mongoose from "mongoose";
import dotenv from "dotenv";

const database=()=>{
    mongoose.connect(process.env.database).then(()=>{
        console.log("database Connected");
    }).catch((error)=>{
        console.log(error)
    })
}
export default database;