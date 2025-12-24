import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const DB_NAME = "Ai-Resume-Builder";
        const connectionResponse = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected !! DB Host : ${connectionResponse.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection FAILED:",error);
    }
}

export default connectDB