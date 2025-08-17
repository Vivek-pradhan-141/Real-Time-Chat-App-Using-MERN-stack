import { create } from "zustand";
import { api } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL = import.meta.env.MODE==="development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({

    
    authUser: null,
    isCheckingAuth: true,
    
    isSigningUp: false,
    signUpPage: true,
    signUpLogo: (value) => {
        set({ signUpPage: value });
    },
    
    isLoggingIn: false,
    logInPage: true,
    logInLogo: (val) => {
        set({ logInPage: val });
    },
    
    isUpdatingProfile: false,
    isUpdatingName: false,
    
    
    
    socket: null,
    onlineUsers: [],





    checkAuth: async () => {
        try {
            const res = await api.get("/auth/check");
            set({ authUser: res.data });

            get().connectSocket();
        } catch (error) {
            set({ authUser: null });
            console.log("error in checkAuth: " + error);
        }
        finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await api.post("/auth/signup", data);
            toast.success("Signed Up Successfully");
            set({ authUser: res.data });
            set({ signUpPage: true });
            set({ logInPage: true });

            get().connectSocket();
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isSigningUp: false });
        }
    },

    logIn: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await api.post("/auth/login", data);
            toast.success("Logged-In Successfully");
            set({ authUser: res.data });
            set({ logInPage: true });
            set({ signUpPage: true });

            get().connectSocket();
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isLoggingIn: false });
        }
    },

    Logout: async () => {
        try {
            await api.post("/auth/logout");
            set({ authUser: null });
            set({ signUpPage: false });
            set({ logInPage: false });
            toast.success("Logged Out SuccessFully !");

            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (image) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await api.put("/auth/update-profile", image);
            toast.success("Profile Image Updated SuccessFully");
        }
        catch (error) {
            toast.error("Profile Pic Updation Failed");
        }
        finally {
            set({ isUpdatingProfile: false });
        }
    },

    updateName: async (userName) => {
        try {
            const res = await api.put("/auth/update-name", { name: userName });
            toast.success(res.data.message);

            // update local store state so components react immediately
            // set((state) => ({
            //     authUser: { ...state.authUser, name: userName }
            // }));
        } catch (error) {
            return toast.error(error.response.data.message);
        }
    },

    deleteProfilePicture: async () => {
        try {
            const res = await api.put("/auth/deleteProfilePic");
            toast.success(res.data.message);
        } catch (error) {
            return toast.error(error.response.data.message);
        }
    },


    connectSocket: ()=>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;

        // here we pass query->userId:authUser._id so that we can access any online logged in user's Id in the socket.js in backend server
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        })
        socket.connect();
        set({socket:socket});

        socket.on("getOnlineUsers" ,(userIds)=>{
            set({onlineUsers: userIds});
        })
    },

    disconnectSocket: ()=>{
        if(get().socket.connected) get().socket.disconnect();
    },


}))