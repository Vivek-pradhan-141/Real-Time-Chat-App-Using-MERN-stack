import { Server } from "socket.io";
import http from "http";
import express from "express";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials:true,
    }
})


export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}


//used to store online users
const userSocketMap = {};

io.on("connection", (socket)=>{
    // console.log("A user Connected ",socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId]=socket.id;

    //emit() is used to send events to all conected clients
    //basically as we update the online users to the frontend in useAuthStore  ---  1st parameter is any name
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
 
    socket.on("disconnect",()=>{
        // console.log("A user disconnected ",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})


export {io, app, server};
