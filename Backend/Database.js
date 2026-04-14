import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://Backend:Backend@cluster0.hzrxdr1.mongodb.net/Backend");
        console.log("Database is connected successfully");
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect
