import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/messageModel.js";
import User from "../models/model.js";



export const getUserSidebar = async (req, res) => {
    try {
        const loggedId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedId } }).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch (error) {
        console.log("error in getUserSidebar controller !! : " + error.message);
        return res.status(500).json({ message: "Internal Service Error !!!" });
    }
}

export const getMessages = async (req,res)=>{
    try {
        const {id:userToChatId} = req.params;  //it takes dynamic selected id as userToChatId
        const myId = req.user._id;

        //now we want the messages either its from senderId(myId) or receiverId i.e the ones who are chatting that's why we will use a filter
        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ],
        })

        res.status(200).json(messages)
    } 
    catch (error) {
        console.log("error in getMessages controller !! : " + error.message);
        return res.status(500).json({ message: "Internal Service Error !!!" });
    }
}

export const sendMessages = async (req, res)=>{
    try {
        const {text, image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })
        await newMessage.save();

        //till here what we have done is :
        //we get the text message
        //we get the image url(if image is given)->uploaded to cloudinary and get the associated string url
        //create a document of the entire message with both id's and text and image and save it in the database


        //realtime messege send functionality for socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage); //you can give any name you want to emit not only "newMessage"
        }


        res.status(201).json(newMessage);
    }  
    catch (error) {
        console.log("error in sendMessage controller !! : " + error.message);
        return res.status(500).json({ message: "Internal Service Error !!!" });
    }
}
