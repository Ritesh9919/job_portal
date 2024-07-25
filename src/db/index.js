import mongoose from "mongoose";



export const connectDB = async()=> {
    try {
        await mongoose.connect('mongodb+srv://Riteshm:19991@nodeexpressproject.bsqzdhp.mongodb.net/job-portal?retryWrites=true&w=majority');
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting database", error);
    }
}