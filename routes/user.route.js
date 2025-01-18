import { Router } from "express";
const userrouter=Router()

import { registeruser,loginuser,logoutuser} from "../controllers/user.controller.js";
import verifyjwt from "../middlewares/auth.middleware.js";

userrouter.post("/signup",registeruser)
userrouter.post("/login",loginuser)
userrouter.post("/logout",verifyjwt,logoutuser)

export default userrouter