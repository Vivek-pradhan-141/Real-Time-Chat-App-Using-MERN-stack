import mongoose from "mongoose"
// import dotenv from "dotenv"  
// dotenv.config();                  // already done in server.js

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected Successfully : ${conn.connection.host}`);
    } 
    catch (error) {
        console.log(`Database connection failed : ${error}`);
    }
}

export default connectDB;

