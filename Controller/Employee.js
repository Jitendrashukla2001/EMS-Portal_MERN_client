import express from "express";
import { Employee } from "../models/Employee.js";
import { EmployeeHistory } from "../models/EmployeeHistory.js";
import { User } from "../models/User.js";

export const EmployeeRegister=async (req,res)=>{
    try {
    const {name,email,address,experience,lastWorkCompany,dateOfResignation,joiningDate}=req.body;
    if(!name ||!email ||!address ||!experience ||!lastWorkCompany ||!dateOfResignation ||!joiningDate)
    {
        return res.status(400).json({
            success: false,
            message: "All fields are requried",
        })
    }

    let checkEmail=await Employee.findOne({email})
    if(checkEmail)
    {
      return res.status(400).json({
        success:false,
        message:"This Employee Email Already Exist in database",
      })
    }

    await Employee.create({
        name,
        email,
        address,
        experience,
        lastWorkCompany,
        dateOfResignation,
        joiningDate
    })
   

    return res.status(201).json({
        success: true,
        message: "Employee Created Successfully",
    })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "failed to register Employee"
        })
    }
}

export const UpdateEmployee=async (req,res)=>{
    try {
        let empid=req.params.id;
        let {name,email,address,experience,lastWorkCompany,dateOfResignation,joiningDate}=req.body;
        var employee=await Employee.findById(empid)
        // console.log(empid)
        if(!employee)
        {
            return res.status(404).json({ msg: "Employee not found" });
        }

        if (!name) name = employee.name;
        if (!email) email = employee.email;
        if (!address) address = employee.address;
        if (!experience) experience = employee.experience;
        if (!lastWorkCompany) lastWorkCompany = employee.lastWorkCompany;
        if (!dateOfResignation) dateOfResignation = employee.dateOfResignation;
        if (!joiningDate) joiningDate = employee.joiningDate;

        const changes = [];
        //need to add multiple conditions 
        if (name !== employee.name) changes.push({ field: "name", oldValue: employee.name, newValue: name });
        if (email !== employee.email) changes.push({ field: "email", oldValue: employee.email, newValue: email });
        if (address !== employee.address) changes.push({ field: "address", oldValue: employee.address, newValue: address });
        if (experience !== employee.experience) changes.push({ field: "experience", oldValue: employee.experience, newValue: experience });
        if (lastWorkCompany !== employee.lastWorkCompany) changes.push({ field: "lastWorkCompany", oldValue: employee.lastWorkCompany, newValue: lastWorkCompany });
        if (dateOfResignation !== employee.dateOfResignation) changes.push({ field: "dateOfResignation", oldValue: employee.dateOfResignation, newValue: dateOfResignation });
        if (joiningDate !== employee.joiningDate) changes.push({ field: "joiningDate", oldValue: employee.joiningDate, newValue: joiningDate });
        
        if (changes.length > 0) {
            const history = new EmployeeHistory({ employeeId: employee.id, changes });
            await history.save();
          }

          if (name !== employee.name) employee.name = name;
          if (email !== employee.email) employee.email = email;
          if (address !== employee.address) employee.address = address;
          if (experience !== employee.experience) employee.experience = experience;
          if (lastWorkCompany !== employee.lastWorkCompany) employee.lastWorkCompany = lastWorkCompany;
          if (dateOfResignation !== employee.dateOfResignation) employee.dateOfResignation = dateOfResignation;
          if (joiningDate !== employee.joiningDate) employee.joiningDate = joiningDate;

          await employee.save();

          return res.status(201).json({
            success: true,
            message: "Employee Updated Successfully",
            employee
        }) 
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteEmployee=async (req,res)=>{
    try {
       let empid=req.params.id;
       let findEmployee=await Employee.findByIdAndDelete(empid);
       //delete the employeehistory as well
       let findinHistoryanddelete=await EmployeeHistory.findByIdAndDelete(empid);

       if(!findEmployee)
       {
        return res.status(400).json({
            success: false,
            message: "Employee not exists"
        })
       }

       return res.status(200).json({
        success: true,
        message: `Employee ${findEmployee.name} deleted successfully`
    })    
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "failed to delete Employee"
        })
    }
}

export const getAllEmployee=async (req,res)=>{
    try {
        let getalluser=await Employee.find({});
         
        return res.status(200).json({
            success: true,
            message: "Employee details",
            getalluser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "failed to get Employees",
            
        })
    }
}

export const employeebyid=async (req,res)=>{
    try {
        let empid=req.params.id;
        let edituser=await Employee.findById(empid);
         
        return res.status(200).json({
            success: true,
            message: "Employee details",
            edituser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "failed to get Employee by Id",
            
        })
    }
}

