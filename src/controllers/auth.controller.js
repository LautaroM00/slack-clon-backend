import { validateEmail, validateLength } from "../helpers/validations.js"
import ResponseBuilder from "../helpers/builders/ResponseBuilder.js"
import UserRepository from "../repositories/User.repository.js"
import bcrypt from 'bcrypt'
import emailTransporter from "../config/email/email.transporter.js"
import getRegisterHTML from "../config/email/register.html.js"
import getForgotPasswordHTML from "../config/email/forgotPassword.html.js"
import jwt from 'jsonwebtoken'
import ENVIROMENT from "../config/ENVIROMENT.js"
import AppError from "../helpers/builders/AppError.js"



export const registerController = async (req, res, next) => {
    try {

        const userData = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        }

        const validations = {
            email: validateEmail,
            password: validateLength,
            name: validateLength
        }

        let errors = {}
        for (let field in userData) {
            let validationResult = validations[field](field, userData[field])

            validationResult ? errors[field] = validationResult : ''
        }

        if (Object.keys(errors).length > 0) {
            throw { errors: errors }
        }

        userData.password = await bcrypt.hash(userData.password, 10)

        const verificationToken = jwt.sign({
            email: userData.email
        },
            ENVIROMENT.SECRET_KEY,
            {
                expiresIn: '1d'
            }
        )

        await UserRepository.createUser(userData)

        await emailTransporter.sendMail({
            to: userData.email,
            subject: 'Slack clon - Confirmación de registro',
            html: getRegisterHTML(userData.name, ENVIROMENT.URL_FRONT + '/verify-email/' + verificationToken)
        })

        const response = new ResponseBuilder()
            .setCode('USER_CREATED_SUCCESS')
            .setMessage('Usuario creado con éxito.')
            .build()

        return res.json(response)
    }
    catch (err) {
        return next(new AppError(err.message, err.code))
    }
}











export const loginController = async (req, res, next) => {
    try {

        const { email, password } = req.body

        const userDB = await UserRepository.getUser(email)

/*         if (!await bcrypt.compare(password, userDB.password)) {
            throw {
                error: 'Las contraseñas no coinciden'
            }
        } */

        const accessToken = jwt.sign({
            email: email,
            id: userDB.id
        },
            ENVIROMENT.SECRET_KEY
            ,
            {
                expiresIn: '1d'
            }
        )

        const response = new ResponseBuilder()
            .setCode('USER_LOGIN_SUCCESS')
            .setMessage('Inicio de sesión exitoso.')
            .setPayload({
                accessToken: accessToken
            })
            .build()

        return res.json(response)
    }
    catch (err) {
        return next(new AppError(err.message, err.code))
    }
}











export const verifyEmailController = async (req, res, next) => {
    try {

        const { verificationToken } = req.params

        const data = jwt.verify(verificationToken, ENVIROMENT.SECRET_KEY)

        await UserRepository.verifyUser(data.email)

        const response = new ResponseBuilder()
            .setCode('USER_VERIFICATION_SUCCESS')
            .setMessage('Usuario verificado exitosamente.')
            .build()

        return res.json(response)

    }
    catch (err) {
        return next(new AppError(err.message, err.code))
    }
}










export const forgotPasswordController = async (req, res, next) => {
    try {

        const { email } = req.body

        const userDB = await UserRepository.getUser(email)

        if (!userDB) {
            throw {
                error: 'El usuario no existe en la base de datos.'
            }
        }

        const validationToken = jwt.sign({
            email: email
        },
            ENVIROMENT.SECRET_KEY
            ,
            {
                expiresIn: '1d'
            }
        )

        await emailTransporter.sendMail({
            to: email,
            subject: 'Slack clon - Olvidé mi contraseña',
            html: getForgotPasswordHTML(userDB.name, ENVIROMENT.URL_FRONT + '/reset-password/' + validationToken)
        })

        const response = new ResponseBuilder()
            .setCode('RESET_PASSWORD_EMAIL_SENT')
            .setMessage('Se envió correctamente el email de reestablecimiento de contraseña.')
            .build()

        return res.json(response)

    }
    catch (err) {
        return next(new AppError(err.message, err.code))
    }
}










export const resetPasswordController = async (req, res, next) => {
    try {

        const { validationToken } = req.params

        const { password } = req.body

        const data = jwt.verify(validationToken, ENVIROMENT.SECRET_KEY)

        await UserRepository.changeUserPassword(password, data.email)

        const response = new ResponseBuilder()
            .setCode('PASSWORD_RESET_SUCCESS')
            .setMessage('La contraseña se actualizó correctamente')
            .build()

        return res.json(response)

    }
    catch (err) {
        return next(new AppError(err.message, err.code))
    }
}