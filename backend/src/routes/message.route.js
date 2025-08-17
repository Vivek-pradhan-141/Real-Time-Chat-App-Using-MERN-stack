import express from "express"
import { protectRoute } from "../middlewares/protectRoute.js"
import { getMessages, getUserSidebar, sendMessages } from "../controllers/messageControllers.js"

const router = express.Router()

router.get("/users", protectRoute, getUserSidebar);

router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessages);




export default router