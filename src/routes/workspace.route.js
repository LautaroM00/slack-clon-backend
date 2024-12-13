import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import { addWorkspaceMemberController, createWorkspaceController, deleteWorkspaceMemberController, deleteWorkspaceController, getWorkspaceMembersController, getUserWorkspacesController } from '../controllers/workspace.controller.js'

const workspaceRouter = express.Router()


workspaceRouter.post('/', authMiddleware, createWorkspaceController)
workspaceRouter.get('/', authMiddleware, getUserWorkspacesController)
workspaceRouter.put('/delete/:workspaceName', authMiddleware, deleteWorkspaceController)

/* MEMBERS */

workspaceRouter.post('/member/:workspaceName', authMiddleware, addWorkspaceMemberController)
workspaceRouter.delete('/member/:workspaceName/:userId', authMiddleware, deleteWorkspaceMemberController)
workspaceRouter.get('/member/:workspaceName', authMiddleware, getWorkspaceMembersController)




export default workspaceRouter