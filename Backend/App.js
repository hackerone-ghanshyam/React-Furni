import dotenv from "dotenv";
dotenv.config();
import express from "express";
import fileUpload from "express-fileupload";
import dbConnect from "./Database.js";
import userRouter from "./router/userRouter.js";
import cors from "cors"


const app = express()

app.use(express.json())
app.use(cors())
app.use(fileUpload())

const port = 2222;
dbConnect();

app.use("/user", userRouter)

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})