import userModel from "../models/user.model.mjs";
import bcrypt from 'bcryptjs';
import verifyEmailTemplate from "../utils/verifyEmailTemplate.mjs";
import sendEmail from "../config/sendEmail.mjs";

export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body
        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Provide name , email , password",
                error: true,
                success: false
            })
        }

        const user = await userModel.findOne({ email })
        if (user) {
            return response.json({
                message: "Already register email",
                error: true,
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const payload = {
            name, email, password: hashPassword
        }
        const newUser = new userModel(payload)
        const save = await newUser.save()
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from blinkeat",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailTemplate
            })
        })

        return response.json({
            message: "USer Registration Successful",
            error: false,
            success: true,
            data: save
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


export async function verifyEmailController(request, response) {
    try {
        const { body } = request.body
        const user = await userModel.findOne({ _id: code })
        if (!user) {
            return response.status(400).json({
                message: "Invalid Code",
                error: true,
                success: false
            })
        }

        const updateUser = await userModel.updateOne({ _id: code }, { verifyEmail: true })
        return response.json({
            message: "verify emails",
            success: true,
            error: false
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: true
        })
    }
}

// login controler 
export async function loginController(request, response) {
    try {
        const { email, password } = request.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return response.status(400).json({
                message: "USer not Registed",
                error: true,
                success: false
            })
        }
        if (user.status !== "Active") {
            return response.status(402).json({
                message: "COntact to Admin",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcrypt.compare(password)
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}