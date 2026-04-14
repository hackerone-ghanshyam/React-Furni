import mongoose from "mongoose";
import userdataschema from "../model/UserScheme.js";
import bcrypt from 'bcrypt';
import Order from "../model/OrderDetailsSchema.js";
import nodemailer from "nodemailer";
import tokenGen from "../token/TokenGen.js";
import crypto from "crypto";

export const signup = async (req, res) => {
    try {
        const findEmail = await userdataschema.findOne({ email: req.body.email })
        if (findEmail !== null) {
            return res.json({
                status: 400,
                sucess: false,
                message: "user already exist",
                body: {}
            })
        } else {
            const SaltRound = 10;
            const encPass = await bcrypt.hash(req.body.password, SaltRound);
            const data = await userdataschema.create({ ...req.body, password: encPass });
            console.log(data, "glglg")

            console.log(data.id, "klkl")
            console.log(data._id, "opop")

            const tok = await tokenGen({ id: data.id })
            console.log(tok, "tokenCont")

            data.token = tok.token
            data.logintime = tok.decode.iat
            data.save()

            return res.json({
                status: 200,
                sucess: true,
                message: "user sucessfully login",
                body: { data }
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            sucess: false,
            message: "user not sucessfully login",
            body: {}
        })
    }
}

export const login = async (req, res) => {
    try {
        const data = await userdataschema.findOne({ email: req.body.email })
        if (!req.body.email) {
            return res.json({
                status: 400,
                sucess: false,
                message: "Email is required",
                body: {}
            })
        } else if (!req.body.password) {
            return res.json({
                status: 400,
                sucess: false,
                message: "password is required",
                body: {}
            })
        } else {
            if (data === null) {
                return res.json({
                    status: 400,
                    sucess: false,
                    message: "Email is not valid",
                    body: {}
                })

            } else {
                const decPass = await bcrypt.compare(req.body.password, data.password)
                if (decPass == false) {
                    return res.json({
                        status: 400,
                        sucess: false,
                        message: "Invalid password",
                        body: {}
                    })

                } else {
                    const tok = await tokenGen({ id: data.id })
                    console.log(tok, "tokenCont")

                    data.token = tok.token
                    data.logintime = tok.decode.iat
                    data.save()
                    return res.json({
                        status: 200,
                        sucess: true,
                        message: "user successfully login",
                        body: data
                    })
                }
            }
        }
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            success: false,
            message: error,
            body: {}
        })
    }
}


export const findUser = async (req, res) => {
    try {
        const Data = await userdataschema.find()
        return res.json({
            status: 200,
            success: true,
            message: "Here all the user data",
            body: Data
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            success: false,
            message: error,
            body: {}
        })
    }
}

export const findUserByIdByBody = async (req, res) => {
    try {
        const data = await userdataschema.findById(req.body.id)
        return res.json({
            status: 200,
            success: true,
            message: "user data",
            body: data
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            success: false,
            message: error,
            body: {}
        })
    }
}

export const findUserByIdByparams = async (req, res) => {
    try {
        const data = await userdataschema.findById({ _id: req.params.id })
        return res.json({
            status: 200,
            success: true,
            message: "user data",
            body: data
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            success: false,
            message: error,
            body: {}
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const data = await userdataschema.findByIdAndDelete({ _id: req.params.id })
        const count = await userdataschema.countDocuments()
        return res.json({
            status: 200,
            success: true,
            message: "user data delete successfully",
            body: data, count
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            success: false,
            message: error.message,
            body: {}
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const encPass = await bcrypt.hash(req.body.password, 10)
        const data = await userdataschema.findByIdAndUpdate({ _id: req.body.id }, { ...req.body, password: encPass }, { new: true })
        console.log(data, "updated User")
        return res.json({
            status: 200,
            success: true,
            message: "user data update successfully",
            body: data
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            success: false,
            message: error.message,
            body: {}
        })
    }
}

export const OrderDetails = async (req, res) => {
    try {
        const { userId, email, products, grandTotal } = req.body;
        if (!userId || !email) {
            return res.status(400).json({
                message: "User not authenticated",
            })
        }
        if (!products || products.length === 0) {
            return res.status(400).json({
                message: "No products in cart",
            });
        }
        const newOrder = new Order({
            userId,
            email,
            products,
            grandTotal,
        });
        await newOrder.save();

        res.status(200).json({
            message: "Order Stored Successfully", Order: newOrder,
        });
    } catch (error) {
        res.status(500).json({
            message: "Order storing failed",
            error: error.message,
        });
    }
};

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                sucess: false,
                message: "Email is required"
            });
        }

        const existUser = await userdataschema.findOne({ email });

        if (!existUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const buf = await crypto.randomBytes(32);
        const token = buf.toString("hex");
        existUser.resetToken = token;
        existUser.resetTokenExpiry = Date.now() + 3600000;
        await existUser.save();

        const resetLink = `http://localhost:3000/reset-password?token=${token}`;
        console.log("step:", resetLink);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD,
            },
            tls: { rejectUnauthorized: false },
        });
        console.log("step 2: transporter created");

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Reset your password",
            html: `<h3>Password Reset</h3>
            <p>Click below to reset your password</p>
            <a href="${resetLink}">${resetLink}</a>
            `,
        });
        console.log("step 3: email sent");

        return res.status(200).json({
            success: true,
            message: "Reset email sent successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export default forgetPassword;


export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Token and password required",
            });
        }

        const user = await userdataschema.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
