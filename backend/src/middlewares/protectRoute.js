import jwt from "jsonwebtoken";
import User from "../models/model.js";

export const protectRoute = async (req,res,next)=>{
    try {
        //it grabs the token from the authorized or logged in user  and to use it we will use a middleware --> token parser in server.js
        const token  = req.cookies.jwt;  //jwt--> token_name used while creating the token
        if(!token){
            return res.status(401).json({message:"Unauthorised - No token Provided!"});
        } 
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"Unauthorised - Invalid Token!"});
        }

        //if every thing is fine & token if found we will find the user
        //fetch the user by using the userId field in the token(which we give while generating the token)
        const user = await User.findById(decoded.userId).select("-password");  //fetch user detail except the pasword for security
        if(!user){
            return res.status(404).json({message:"User not Found!"});
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("error in protecRoute middleware: "+error.message);
        return res.status(500).json({ message: "Internal Service Error !!!" });
    }
}