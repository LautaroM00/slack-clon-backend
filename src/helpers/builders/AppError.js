class AppError extends Error{
    constructor(message, status){
        super(message)
        this.status = status || 500
        this.isOperational = String(status).startsWith('4') ? true : false
    }
}


export default AppError