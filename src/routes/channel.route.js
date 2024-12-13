import express from 'express'
import { createChannelController, deleteChannelController, getChannelsController } from '../controllers/channel.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const channelRouter = express.Router()

channelRouter.post('/create/:workspaceName', authMiddleware, createChannelController)
channelRouter.put('/delete/:workspaceName/:channelName', authMiddleware, deleteChannelController)
channelRouter.get('/:workspaceName', authMiddleware, getChannelsController)




export default channelRouter