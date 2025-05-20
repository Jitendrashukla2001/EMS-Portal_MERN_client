import mongoose from "mongoose";

const EmployeeHistorySchema=new mongoose.Schema({
    employeeId:{type:mongoose.Schema.Types.ObjectId,ref:"Employee",required:true},
    changes:[{
        field:String,
        oldValue:String,
        newValue:String,
        date:{type:Date,default:Date.now},
    },],
});

export const EmployeeHistory=mongoose.model("EmployeeHistory",EmployeeHistorySchema);