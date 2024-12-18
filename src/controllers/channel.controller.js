import AppError from "../helpers/builders/AppError.js"
import ResponseBuilder from "../helpers/builders/ResponseBuilder.js"
import ChannelRepository from "../repositories/Channel.repository.js"

export const createChannelController = async (req, res, next) => {
    try {

        const { id } = req.user

        const { channelName } = req.body

        const { workspaceName } = req.params


        if (String(channelName).length < 3 || String(channelName).length > 23) {
            return next(new AppError('El canal debe tener entre 3 y 23 caracteres inclusive.', 400))
        }

        await ChannelRepository.createChannel(workspaceName, id, channelName)

        const response = new ResponseBuilder()
            .setCode('CHANNEL_CREATED_SUCCESS')
            .setMessage('Canal creado con éxito.')
            .build()

        return res.json(response)

    }
    catch (err) {
        return next(new AppError(err.message, err.code))
    }

}




export const deleteChannelController = async (req, res, next) => {
    try {

        const { workspaceName, channelId } = req.params

        await ChannelRepository.deleteChannel(workspaceName, channelId)

        const response = new ResponseBuilder()
            .setCode('CHANNEL_DELETED_SUCCESS')
            .setMessage('Canal eliminado con éxito.')
            .build()

        return res.json(response)

    }
    catch (err) {
        return next(new AppError(err.message, err.code))
    }

}





export const getChannelsController = async (req, res, next) => {
    try {

        const { workspaceName } = req.params

        const channels = await ChannelRepository.getChannels(workspaceName)

        const response = new ResponseBuilder()
            .setCode('CHANNEL/S_DELIVERED_SUCCESS')
            .setMessage('Canale/s enviados con éxito')
            .setPayload({
                channels: channels
            })
            .build()

        return res.json(response)
    }
    catch (err) {
        return next(new AppError(err.message, err.code))
    }

}



/* export const deleteChannelController = async(req, res, next) => {
    try{

    }
    catch(err){
        console.log('a', err)
    }

}

 */