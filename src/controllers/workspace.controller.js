import ResponseBuilder from "../helpers/builders/ResponseBuilder.js"
import ChannelRepository from "../repositories/Channel.repository.js"
import UserRepository from "../repositories/User.repository.js"
import WorkspaceRepository from "../repositories/Workspace.repository.js"



export const createWorkspaceController = async (req, res, next) => {
    try {

        const { id } = req.user

        const { formState } = req.body
        const {workspaceName, channelName} = formState
        if (String(workspaceName).length < 5 || String(workspaceName).length > 20) {
            throw new Error()
        }

        await WorkspaceRepository.createWorkspace(workspaceName, id)
        await WorkspaceRepository.addWorkspaceMember(workspaceName, id)
        await ChannelRepository.createChannel(workspaceName, id, channelName)

        const response = new ResponseBuilder()
            .setCode('WORKSPACE_CREATED_SUCCESS')
            .setMessage('Workspace creado con éxito.')
            .build()

        return res.json(response)

    }
    catch (err) {
        console.log('createWorkspaceController: ', err)

        err.sql ? console.log(err.sqlMessage) : ''

        return
    }

}

export const getUserWorkspacesController = (admin) => {

    return async (req, res, next) => {
        try {

            const { id } = req.user
    
            const workspaces = admin ? await WorkspaceRepository.getAdminWorkspaces(id) :await  WorkspaceRepository.getMemberWorkspaces(id)
    
            const response = new ResponseBuilder()
                .setCode('WORKSPACES_GIVEN_SUCCESS')
                .setMessage('Workspaces enviados con éxito.')
                .setPayload({
                    workspaces: workspaces
                })
                .build()
    
            return res.json(response)
    
        }
        catch (err) {
            console.log('getAllUserWorkspacesController: ', err)
        }
    }

}

export const deleteWorkspaceController = async (req, res, next) => {
    try {

        const { id } = req.user

        const { workspaceName } = req.params

        if (!await WorkspaceRepository.deleteWorkspace(workspaceName, id)) {
            throw {
                message: 'El workspace que quiere eliminar no existe.'
            }
        }

        const response = new ResponseBuilder()
            .setCode('WORKSPACES_DELETED_SUCCESS')
            .setMessage('Workspaces eliminado con éxito.')
            .build()

        return res.json(response)
    }
    catch (err) {
        console.log('getAllUserWorkspacesController: ', err)
    }

}

/* MANEJO DE MEMBERS */

export const addWorkspaceMemberController = async (req, res, next) => {
    try {

        const { id } = req.user

        const { email } = req.body

        const { workspaceName } = req.params

        const userDB = await UserRepository.getUser(email)

        if (!userDB) {
            throw {
                message: 'El usuario ingresado no se encuentra registrado.'
            }
        }

        await WorkspaceRepository.addWorkspaceMember(workspaceName, userDB.id)

        const response = new ResponseBuilder()
            .setCode('MEMBER_ADDED_SUCCESS')
            .setMessage('Miembro agregado con éxito.')
            .build()

        return res.json(response)

    }
    catch (err) {
        console.log('addWorkspaceMemberController: ', err)
    }

}

export const deleteWorkspaceMemberController = async (req, res, next) => {
    try {

        const { workspaceName, userId } = req.params

        await WorkspaceRepository.deleteWorkspaceMember(workspaceName, userId)

        const response = new ResponseBuilder()
            .setCode('MEMBER_DELETED_SUCCESS')
            .setMessage('Miembro eliminado con éxito.')
            .build()

        return res.json(response)

    }
    catch (err) {
        console.log('deleteWorkspaceMemberController: ', err)
    }

}




export const getWorkspaceMembersController = async (req, res, next) => {
    try {

        const { workspaceName } = req.params

        const workspaces = await WorkspaceRepository.getWorkspaceMembers(workspaceName)

        const response = new ResponseBuilder()
            .setCode('MEMBERS_GOTTEN_SUCCESS')
            .setMessage('Miembros recibidos con éxito.')
            .setPayload({
                workspaces: workspaces
            })
            .build()

        return res.json(response)

    }
    catch (err) {
        console.log('deleteWorkspaceMemberController: ', err)
    }
}

export const getMemberWorkspacesController = async (req, res, next) => {
    try {

        const { id } = req.user

        const workspaces = await WorkspaceRepository.getMemberWorkspaces(id)

        const response = new ResponseBuilder()
            .setCode('WORKSPACES_GIVEN_SUCCESS')
            .setMessage('Workspaces enviados con éxito.')
            .setPayload({
                workspaces: workspaces
            })
            .build()

        return res.json(response)

    }
    catch (err) {
        console.log('getAllUserWorkspacesController: ', err)
    }

}