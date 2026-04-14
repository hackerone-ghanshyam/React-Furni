import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.SECRET_KEY);
        console.log("Database is connected successfully");
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect
