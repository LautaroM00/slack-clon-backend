import express from "express"
import { forgotPasswordController, loginController, registerController, resetPasswordController, verifyEmailController } from "../controllers/auth.controller.js"

const authRouter = express.Router()


authRouter.post('/register', registerController)
authRouter.post('/login', loginController)
authRouter.get('/verification/:accessToken', verifyEmailController)
authRouter.post('/forgot-password', forgotPasswordController)
authRouter.put('/reset-password/:validationToken', resetPasswordController)


export default authRouter