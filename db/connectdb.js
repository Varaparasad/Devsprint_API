import mongoose from "mongoose";
const connectmongodb=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/devsprint`)
        console.log("MONGODB connected sucessfully")
    } catch (error) {
        console.error("MONGODB connection failed: ",error)
        process.exit(1)
    }
}
// export default connectmongodb or
export  {connectmongodb}
