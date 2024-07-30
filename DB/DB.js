import mongoose from "mongoose";
import colors from 'colors';

export const connectDb = async() =>{
    try {
        const conn =await mongoose.connect(process.env.MongoDb_URL);
        console.log("connected the mongo server".bgYellow.white);
    } catch (error) {
        console.log(`Mongo Db Error :${error.massage}`.bgRed);
        process.exit(1)
    }
}