import ResponseBuilder from "../helpers/builders/ResponseBuilder.js"

const errorHandlerMiddleware = (error, req, res, next) => {
    try{

        let { message, status, isOperational } = error

        message = message ?? 'Error de servidor'
        status = status ?? 500
        
        if(isOperational){
            return res.json({
                message: message,
                status: status,
                ok: false
            })
        }else{
            console.log({
                message: message,
                status: status,
                ok: false
            })
            return res.json({
                message: message,
                status: status,
                ok: false
            })
        }
        
        
    }
    catch(error){
        console.log(`Error de servidor: 
            
            `, error)

    }
}

export default errorHandlerMiddleware