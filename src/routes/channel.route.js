import express from 'express'
import { createChannelController, deleteChannelController, getChannelsController } from '../controllers/channel.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const channelRouter = express.Router()

channelRouter.post('/:workspaceName', authMiddleware, createChannelController)
channelRouter.put('/delete/:workspaceName/:channelId', authMiddleware, deleteChannelController)
channelRouter.get('/all/:workspaceName', authMiddleware, getChannelsController('all'))
channelRouter.get('/last/:workspaceName/:channelName', authMiddleware, getChannelsController('last'))




export default channelRouter