import ResponseBuilder from "../helpers/builders/ResponseBuilder.js"
import MessageRepository from "../repositories/Message.repository.js"
import { dateFormatter } from "../helpers/dateFormatter.js"
import AppError from "../helpers/builders/AppError.js"

export const createMessageController = async (req, res, next) => {
    try {

        const { content } = req.body
        const { channel_id } = req.params
        const { id } = req.user

        if (!content) {
            return next(new AppError('El mensaje debe tener contenido.', 400))
        }

        await MessageRepository.createMessage(channel_id, id, content)

        const response = new ResponseBuilder()
            .setCode('MESSAGE_SENT_SUCCESS')
            .setMessage('Mensaje enviado con éxito.')
            .build()

        return res.json(response)

    }
    catch (err) {
        return next(new AppError(err.message, err.code))
    }
}







export const getMessagesController = (amount) => {
    return async (req, res, next) => {
        try {

            const { channel_id } = req.params
    
            const messages = amount === 'all' ? await MessageRepository.getChannelMessages(channel_id) : await MessageRepository.getLastChannelMessage(channel_id) 
    
            const messagesFormatted = dateFormatter(messages)
            
            const response = new ResponseBuilder()
                .setCode('MESSAGE_RECEIVED_SUCCESS')
                .setMessage('Mensajes recibidos con éxito.')
                .setPayload({
                    messages: messagesFormatted
                })
                .build()
    
            return res.json(response)
        }
        catch (err) {
            return next(new AppError(err.message, err.code))
        }
    }
}






export const deleteMessageController = async (req, res, next) => {
    try {

        const { message_id } = req.params

        await MessageRepository.deleteMessage(message_id)

        const response = new ResponseBuilder()
            .setCode('MESSAGE_DELETED_SUCCESS')
            .setMessage('Mensaje eliminado con éxito.')
            .build()

        return res.json(response)
    }
    catch (err) {
        return next(new AppError(err.message, err.code))
    }
}