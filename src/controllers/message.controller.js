import ResponseBuilder from "../helpers/builders/ResponseBuilder.js"
import MessageRepository from "../repositories/Message.repository.js"
import { dateFormatter } from "../helpers/dateFormatter.js"

export const createMessageController = async (req, res, next) => {
    try {

        const { content } = req.body
        const { channel_id } = req.params
        const { id } = req.user

        if (!content) {
            throw {
                message: 'El mensaje debe tener contenido.'
            }
        }

        await MessageRepository.createMessage(channel_id, id, content)

        const response = new ResponseBuilder()
            .setCode('MESSAGE_SENT_SUCCESS')
            .setMessage('Mensaje enviado con éxito.')
            .build()

        return res.json(response)

    }
    catch (err) {
        console.log('createMessageController: ', err)
    }
}







export const getMessagesController = async (req, res, next) => {
    try {

        const { channel_id } = req.params

        const messages = await MessageRepository.getChannelMessages(channel_id)

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
        console.log('getMessagesController: ', err)
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
        console.log('deleteMessageController: ', err)
    }
}




export const getLastMessageController = async (req, res, next) => {
    try{

        const { id } = req.user



    }
    catch(err){
        console.log('getLastMessageController: ', err)
    }



}