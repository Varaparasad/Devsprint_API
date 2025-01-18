import asynchandler from "../utils/asynchandler.js";
import apires from "../utils/apiresponse.js";
import apierr from "../utils/apierror.js";
import { user } from "../models/usermodel.js";

const getaccesstokenandrefreshtoken=async (User)=>{
    const accesstoken=await User.genrateaccesstoken()
    const refreshtoken=await User.genraterefreshtoken()
    User.refreshtoken=refreshtoken
    await User.save({validateBeforeSave:"flase"})
    return {accesstoken,refreshtoken}
}


const registeruser=async (req,res) => {
    // res.status(200).json({
    //     message:"successful"
    // })
    // res.status(201).json(
    //     new apires(200, " ","User registered Successfully")
    // )

    const {name,email,password}=req.body
    if (
        [name,email,password].some((value)=>value?.trim() === "")
    ) {
        // throw new apierr(400,"All fields are required")
        res.redirect('/login-signup?alert=All fields are required')
    }
    const olduser=await user.findOne({
        $or:[{name},{email}]
    })

    if(olduser){
        // throw new apierr(409,"User already exists")
        res.redirect('/login-signup?alert=User already exists try login')
    }
    
        const newuser=await user.create({
            name,
            email,
            password
        })
        const creatednewuser=await user.findById(newuser._id).select("-password -refreshtoken")
        if(creatednewuser){
            // return res.status(201).json(
            //     new apires(200,creatednewuser,"Successfully created user")
            // )
            res.redirect('/landing');
        }
        else{
            throw new apierr(500,"Something went wrong while registering the user please try after sometime")
        }
    
}


const loginuser=async(req,res)=>{
    const {email,password}=req.body
    const currentuser=await user.findOne({
        $or:[{email},{password}]
    })
    if(!currentuser){
        // throw new apierr(404,"user doesnot exists try signingup")
        res.redirect('/login-signup?alert=user doesnot exists try signingup')
    }
    else{
    const passwordcheck=await currentuser.ispasswordcorrect(password)
    if(!passwordcheck){
        // throw new apierr(401,"Invalid user credentials")
        res.redirect('/login-signup?alert=Invalid user credentials')
    }
    else{
    const options={
        httpOnly:true
    }
    const {refreshtoken,accesstoken}=await getaccesstokenandrefreshtoken(currentuser)
    const loggeduser=await user.findById(currentuser._id).select("-password -refreshtoken")
    // return res.status(200)
    // .cookie("accesstoken",accesstoken,options)
    // .cookie("refreshtoken",refreshtoken,options)
    // .json(new apires(200,loggeduser,"Logined user succesfully"))
    res.redirect('/landing')
}
    }
}

const logoutuser=asynchandler(async(req,res)=>{
    await user.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshtoken:1 
            }
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true
    }
    return res.status(200)
    .clearCookie("accesstoken",options)
    .clearCookie("refreshtoken",options)
    .json(new apires(200,{},"User logged out successfully"))
})

export {registeruser,loginuser,logoutuser}