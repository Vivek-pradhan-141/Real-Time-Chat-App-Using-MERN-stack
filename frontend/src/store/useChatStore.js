import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

import { api } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";



export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await api.get("/message/users");
      set({ users: res.data });
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
    finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await api.get(`/message/${userId}`);
      set({ messages: res.data });
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
    finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessages: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await api.post(`/message/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  // function for real time message[] updation using client-io
  subscribeToMessage: ()=>{
    const {selectedUser} = get();
    if(!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    
    socket.on("newMessage",(newMessage)=>{
      //optimize so that messege will go to seperate and individual selected users and not all users
      const isMessageSentFromSelectedUser = (newMessage.senderId === selectedUser._id);
      if(!isMessageSentFromSelectedUser) return;
      set({messages:[...get().messages,newMessage]});
    })
  },
  
  unsubscribeToMessage: ()=>{
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },


}))