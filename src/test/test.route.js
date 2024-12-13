import express from 'express'


const testRouter = express.Router()


testRouter.get('/', (req, res, next) => {
    try{
        res.json({
            ok: true
        })
    }
    catch(err){
        console.log(err)
    }


})


export default testRouter