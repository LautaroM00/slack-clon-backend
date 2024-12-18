import jwt from 'jsonwebtoken'
import ENVIROMENT from '../config/ENVIROMENT.js'
import AppError from '../helpers/builders/AppError.js'

const authMiddleware = (req, res, next) => {

        try{
        const accessToken = req.headers.authorization.split(' ')[1]

        const userData = jwt.verify(accessToken, ENVIROMENT.SECRET_KEY)

        const { email, id } = userData

        req.user = {
            email: email,
            id: id
        }

        return next()
    }
    catch(err){
        return next(new AppError(err.message, err.code))
    }
}

export default authMiddleware