class AppError extends Error{
    constructor(message, code, status){
        super(message)
        this.code = code
        this.status = status || 500
        this.isOperational = String(status).startsWith('4') ? true : false
    }
}


export default AppError