import axios from "axios";

const BASE_URL = import.meta.env.MODE==="development" ? "http://localhost:5001/api" : "/api";
export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,  //this means it will send cookies with every request
})