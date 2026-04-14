import express from 'express';
import forgetPassword, { deleteUser,resetPassword, findUser, findUserByIdByBody, findUserByIdByparams, login, OrderDetails, signup, updateUser } from '../UserController/UserController.js';


const userRouter=express.Router()

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.get("/findUser",findUser)
userRouter.post("/findUserByIdByBody",findUserByIdByBody)
userRouter.get("/findUserByIdByparams/:id",findUserByIdByparams)
userRouter.delete("/deleteUser/:id",deleteUser)
userRouter.put("/updateUser",updateUser)
userRouter.post("/Order",OrderDetails)
userRouter.post("/forgot-password",forgetPassword)
userRouter.post("/reset-password",resetPassword)

export default userRouter