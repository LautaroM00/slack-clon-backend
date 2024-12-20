import AppError from "../helpers/builders/AppError.js"
import ResponseBuilder from "../helpers/builders/ResponseBuilder.js"
import ChannelRepository from "../repositories/Channel.repository.js"
import WorkspaceRepository from "../repositories/Workspace.repository.js"

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

        console.log(err)

        err.sqlState == 23000 ? err.message = 'Ya existe un canal con el nombre ingresado.' : ''

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





export const getChannelsController = (amount) => {

    return async (req, res, next) => {
        try {

            const { id } = req.user

            const { workspaceName, channelName } = req.params

            const channels = amount === 'all' ? await ChannelRepository.getChannels(workspaceName) : await ChannelRepository.getChannelByName(workspaceName, channelName)

            const adminId = await WorkspaceRepository.getWorkspaceAdmin(workspaceName)
            
            const response = new ResponseBuilder()
                .setCode('CHANNEL/S_DELIVERED_SUCCESS')
                .setMessage('Canal/es enviado/s con éxito')
                .setPayload({
                    channels: channels,
                    isAdmin: adminId == id
                })
                .build()

            return res.json(response)
        }
        catch (err) {
            return next(new AppError(err.message, err.code))
        }
    }

}
