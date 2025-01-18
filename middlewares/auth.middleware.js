import asynchandler from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import apierr from "../utils/apierror.js";
import { user } from "../models/usermodel.js";

const verifyjwt=asynchandler(async(req,res,next)=>{
    try {
        const token=req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ", "")
        if(!token){
            throw new apierr(401,"Unauthorized request")
        }
        const decodedtoken=jwt.verify(token,process.env.ACCESSTOKENSECRET)
        const newuser=user.findById(decodedtoken?._id).select("-password -refreshtoken")
        if(!newuser){
            throw new apierr(401,"Invalid accesstoken")
        }
        req.user=newuser
        next()
    } catch (error) {
        throw new apierr(401,error?.message || "Invalid accesstoken")
    }
})

export default verifyjwt