import express from 'express'
import { createMessageController, deleteMessageController, getMessagesController } from '../controllers/message.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const messageRouter = express.Router()

messageRouter.post('/:channel_id', authMiddleware, createMessageController)
messageRouter.get('/:channel_id', authMiddleware, getMessagesController)
messageRouter.put('/:message_id', authMiddleware, deleteMessageController)

messageRouter.get('/last-message/:channel_id', authMiddleware) // TO DO




export default messageRouter