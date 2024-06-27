import mongoose from "mongoose";

const connectDB = async () => {

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/blood");
        console.log("Connected to MongoDB.");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    };
};
export default connectDB;