import mongoose from "mongoose";
import config from "./env.js";

export const connectDB =async () =>{
    try{
        const conn=await mongoose.connect(config.mongodburl,{
            useNewUrlparser:true,
            useUnifiedTopology:true,
        });
        console.log(`MongoDB Connected:${conn.connection.host}`);
        return conn;
    }
    catch(err){
        console.error(`MongoDB connection error:${err}`)
        process.exit(1);

    }
    
};






