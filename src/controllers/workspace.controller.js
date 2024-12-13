import ResponseBuilder from "../helpers/builders/ResponseBuilder.js"
import WorkspaceRepository from "../repositories/Workspace.repository.js"



export const createWorkspaceController = async (req, res, next) => {
    try {

        const { id } = req.user

        const { workspaceName } = req.body

        if (String(workspaceName).length < 5 || String(workspaceName).length > 20) {
            throw new Error()
        }

        await WorkspaceRepository.createWorkspace(workspaceName, id)

        const response = new ResponseBuilder()
            .setCode('WORKSPACE_CREATED_SUCCESS')
            .setMessage('Workspace creado con éxito.')
            .build()

        return res.json(response)

    }
    catch (err) {
        console.log('getAllUserWorkspacesController: ', err)

        err.sql ? console.log(err.sqlMessage) : ''

        return
    }

}

export const getUserWorkspacesController = async (req, res, next) => {
    try {

        const { id } = req.user

        const workspaces = await WorkspaceRepository.getUserWorkspaces(id)

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

export const deleteWorkspaceController = async (req, res, next) => {
    try {

        const { id } = req.user

        const { workspaceName } = req.params

        

        if(!await WorkspaceRepository.deleteWorkspace(workspaceName, id)){
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

export const createWorksdpaceController = async (req, res, next) => {
    try {

        const { id } = req.user

    }
    catch (err) {
        console.log('getAllUserWorkspacesController: ', err)
    }

}

export const createWosrkspaceController = async (req, res, next) => {
    try {

        const { id } = req.user

    }
    catch (err) {
        console.log('getAllUserWorkspacesController: ', err)
    }

}