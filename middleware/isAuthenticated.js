import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({
    path:"../config.env"
})

export const isAuthenticated=async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                message: "User not authenticated",
                success: false
            })
        }
        const decode =await jwt.verify(token,process.env.SECRET_KEY);
        req.id=decode.userId;
        next();
    } catch (error) {
        console.log(error)
    }
}