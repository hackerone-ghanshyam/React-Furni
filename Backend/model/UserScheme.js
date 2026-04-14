import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    phone: { type: Number, default: "0" },
    token: { type: String, default: "" },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    logintime: { type: Number, default: "0" },
}, { timestamps: true })

const userdataschema = mongoose.model("user", userschema)

export default userdataschema