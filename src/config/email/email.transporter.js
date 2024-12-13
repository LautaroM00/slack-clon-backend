import nodemailer from 'nodemailer'
import ENVIROMENT from '../ENVIROMENT.js'
import htmlBody from './register.html.js'

const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        pass: ENVIROMENT.EMAIL_PASSWORD,
        user: ENVIROMENT.EMAIL_USER
    }
})

// Para probar el body

/* await emailTransporter.sendMail({
    to: 'lautaromiceli@gmail.com',
    subject: 'Slack clon - Confirmación de registro',
    html: htmlBody
}) */

export default emailTransporter