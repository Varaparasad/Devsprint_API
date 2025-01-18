import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const userschema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    profilepic:{
        type:String
    },
    refreshtoken:{
        type:String
    },
    watchhistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"video"
        }
    ]
    },{
        timestamps:true
    }
)

userschema.pre("save",async function (next) {
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
        next()
    }
    else{
        next()
    }
})

userschema.methods.ispasswordcorrect=function(passwd){
    return bcrypt.compare(passwd,this.password)
}

userschema.methods.genrateaccesstoken=function () {
    return jwt.sign({
        _id:this._id,
        email:this.email,
        name:this.name
    },process.env.ACCESSTOKENSECRET,{
        expiresIn:process.env.ACCESSTOKENEXPIRY
    })
}
userschema.methods.genraterefreshtoken=function () {
    return jwt.sign({
        _id:this._id
    },process.env.REFRESHTOKENSECRET,{
        expiresIn:process.env.REFRESHTOKENEXPIRY
    })
}


export const user=mongoose.model("user",userschema)