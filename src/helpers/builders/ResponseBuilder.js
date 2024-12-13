export default class ResponseBuilder {

    constructor(){
        this.ok = true,
        this.status = 200,
        this.message = '',
        this.code = ''
    }

    setOk(ok){
        this.ok = ok
        return this
    }
    setStatus(status){
        this.status = status
        return this
    }
    setCode(code){
        this.code = code
        return this
    }
    setMessage(message){
        this.message = message
        return this
    }
    setPayload(payload){
        this.payload = payload
        return this
    }
    build(){
        return this
    }
}