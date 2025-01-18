import mongoose, { Schema } from "mongoose";
const videoschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description: {
        type: String, 
        required: true
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    videoFile: {
        type: String, //cloudinary url
        required: true
    },
    thumbnail: {
        type: String, //cloudinary url
        required: true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{
    timeseries:true
})

export const video=mongoose.model("video",videoschema)