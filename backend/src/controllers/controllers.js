import bcrypt from "bcryptjs"
import User from "../models/model.js"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";



export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        // check the validity of password and email existence
        if (password.length < 6) return res.status(400).json({ message: "password must be atleast of 6 characters !" });

        if (!name || !password || !email) {
            return res.status(400).json({ message: "All Fields are required for signUp !" });
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "email already exists !" });

        //if every thing is Ok add new credentials 
        // hash the passwords (stores the password in random format) - for this we have installed a package bcryptjs

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            password: hashPassword,
            name: name,
        })

        //after creating new User if it is created successfully we generatw jwt(json web token)
        if (newUser) {
            //generate token here
            generateToken(newUser._id, res);
            await newUser.save();

            //after this you can return a succsess response cookie
            res.status(200).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
                createdAt: newUser.createdAt,
            });
        }
        else {
            return res.status(400).json({ message: "Invalid user data !" });
        }
    }
    catch (error) {
        console.log("error in SignUp controller !! : " + error.message);
        return res.status(500).json({ message: "Internal Service Error !!!" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        
        if(!email || !password) return res.status(400).json({ message: "All fields are reqired !" });

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials !" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid Credentials !" });

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            createdAt: user.createdAt,
        })
    }
    catch (error) {
        console.log("error in Login controller !! : " + error.message);
        return res.status(500).json({ message: "Internal Service Error !!!" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("error in Logout controller !! : " + error.message);
        return res.status(500).json({ message: "Internal Service Error !!!" });
    }
}

export const updateProfile = async (req,res)=>{
    try {
        const {profilePic} = req.body;
        //now we can actually access the user properties from request because in the routes we used protecRoutes to authenticate the user first
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,
            {profilePic:uploadResponse.secure_url},
            {new:true}
        );

        res.status(200).json(updatedUser);

        
    } catch (error) {
        console.log("error in updateProfile controller !! : " + error.message);
        return res.status(500).json({ message: "Internal Service Error !!!" });
    }
}

export const deleteProfilePic = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user || !user.profilePic) {
      return res.status(404).json({ message: "No profile picture found" });
    }

    // Extract public_id from Cloudinary URL
    const publicId = user.profilePic
      .split("/")
      .slice(-1)[0]      // Get filename with extension
      .split(".")[0];    // Remove extension

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Remove from DB
    user.profilePic = ""; 
    await user.save();

    res.status(200).json({ message: "Profile picture deleted successfully" });

  } catch (error) {
    console.log("Error in deleteProfilePic controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateName = async (req,res)=>{
    try {
        const {name} = req.body;
        const userId = req.user._id;
        if(!name.trim()) return res.status(400).json({message: "Please Enter a Name First"});
        
        const new_name = await User.findByIdAndUpdate(userId,{name},{new:true});
        return res.status(200).json({message: `Name  Successfully Updated to ${new_name.name} `});

    } catch (error) {
        console.log("error in updateProfile controller !! : " + error.message);
        return res.status(500).json({ message: "Internal Service Error !!!" });
    }
}   

export const checkAuth = (req, res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkAuth controller !! : " + error.message);
        return res.status(500).json({ message: "Internal Service Error !!!" });
    }
}

