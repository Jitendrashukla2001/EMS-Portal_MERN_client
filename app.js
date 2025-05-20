import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./Routes/auth.js"
import database from "./config/db.js";
import cookieParser from "cookie-parser";
import Employeefeature from "./Routes/employee.js"
const app=express();

dotenv.config({
    path:".env"
});
database();
app.use(express.urlencoded({
    extended:true 
}));
const corsOptions={
    origin:"http://localhost:3002",
    credentials:true
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/auth",auth)
app.use("/Employee",Employeefeature)


const PORT=process.env.PORT ||8000;
app.listen(PORT,()=>{
    console.log("Server Connected Successfully");
})