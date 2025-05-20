import mongoose from "mongoose";
const EmployeeSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    address:{type:String},
    experience:{type:Number},
    lastWorkCompany:{type:String},
    dateOfResignation:{type:Date},
    joiningDate:{type:Date},
    
},{timestamps:true});

export const Employee=mongoose.model("Employee",EmployeeSchema);