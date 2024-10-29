//database connection
import mongoose from "mongoose";
import dotenv from 'dotenv';

const connectToDatabase = async () => {
    try{    
        dotenv.config();
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log(error);
    }
};

export default connectToDatabase;
