import express from "express";
import { checkAuth, deleteProfilePic, login, logout, signup, updateName, updateProfile } from "../controllers/controllers.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);
//Here what we do is 1st - we check when some one wants to update profile whether he is logged in or not!
// thats why we are using the middleware protectRoute 

router.put("/update-name", protectRoute, updateName);

router.put("/deleteProfilePic", protectRoute, deleteProfilePic);

router.get("/check", protectRoute, checkAuth);


export default router;
