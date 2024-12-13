import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import { createWorkspaceController, deleteWorkspaceController, getUserWorkspacesController } from '../controllers/workspace.controller.js'

const workspaceRouter = express.Router()


workspaceRouter.post('/', authMiddleware, createWorkspaceController)
workspaceRouter.get('/', authMiddleware, getUserWorkspacesController)
workspaceRouter.put('/delete/:workspaceName', authMiddleware, deleteWorkspaceController)




export default workspaceRouter