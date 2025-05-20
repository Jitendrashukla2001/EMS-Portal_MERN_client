import express from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

export const Register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are requried",
            })
        }
        const find = await User.findOne({ email });
        if (find) {
            return res.status(400).json({
                success: false,
                message: "User Email already Exists Please Login",
            })
        }
        const HashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: HashedPassword });

        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "failed to register"
        })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are requried",
            })
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not exist please register",
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            })
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1h' })
        user = {
            _id: user._id,
            email: user.email,
            status:user.status
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.email}`,
            user,
            success: true
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "failed to login"
        })
    }
}

export const Logout = async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,  
      sameSite: 'strict', 
      secure: false,   
      path: '/'     
    });
  
    return res.json({
      message: "User logged out successfully",
      success: true
    });
};

export const NewadminUser=async (req,res)=>{
    try {
        //first check logged in user is Admin with status As success
        let Admin=req.id;  //from authentication
        let checkAdmin=await User.findById(Admin);
        if(!checkAdmin)
        {
            return res.status(400).json({
                success:false,
                message:"No admin User found",
                findadminwithpending,
            })
        }
        if(checkAdmin.status !=="success")
        {
            return res.status(400).json({
                success:false,
                message:"You are not the authorize Admin",
            })
        }
        let findadminwithpending=await User.find({status:"pending"});

        return res.status(200).json({
            success:true,
            message:"All Admin with pending Status",
            findadminwithpending,
        })

        
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "failed to New Admin User"
        }) 
    }
}


export const verifyNewAdminUser=async (req,res)=>{
    try {
       const {newAdmin,statusValue}=req.body;
  
       let verifyfirst=await User.findById(newAdmin)
       if(!verifyfirst)
       {
        return res.status(400).json({
            success: false,
            message: "Admin User not exist",
        })
       }
      verifyfirst.status=statusValue;
      await verifyfirst.save();

       return res.status(201).json({
        success:true,
        message:`Admin Approved the Another Admin ${verifyfirst.email}`
       })
       
    } catch (error) {

         console.log(error)

        return res.status(500).json({
            success: false,
            message: "failed for User Admin"
        })
    }
}


