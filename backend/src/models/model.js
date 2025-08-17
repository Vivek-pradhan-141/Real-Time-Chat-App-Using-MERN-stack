import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        email:{
            type:"string",
            required:true,
            unique:true,
        },
        password:{
            type:"string",
            required:true,
            minlength:6,
        },
        name:{
            type:"string",
            required:true,
        },
        profilePic:{
            type:"string",
            default:"",
        },
    },
    {timestamps:true},   
)

const User = new mongoose.model("User",userSchema);
export default User;