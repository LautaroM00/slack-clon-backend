import pool from "../config/db.mysql.config.js";

export default class WorkspaceRepository {

    static async createWorkspace(name, owner_id) {

        const query = 'INSERT INTO Workspaces(name, owner_id) VALUES(?, ?)'

        const result = await pool.execute(query, [name, owner_id])

        return result
    }

    static async getAdminWorkspaces(owner_id) {

        const query = 'SELECT * FROM Workspaces WHERE owner_id = ? AND active = 1'

        const result = await pool.execute(query, [owner_id])

        return result[0]
    }

    static async deleteWorkspace(name, owner_id) {

        const query = 'UPDATE Workspaces SET active = 0 WHERE name = ? AND owner_id = ?'

        const result = await pool.execute(query, [name, owner_id])

        return result[0]['changedRows']
    }

    static async getWorkspaceCreated(owner_id) {

        const query = 'SELECT * FROM Workspaces WHERE owner_id = ? AND active = 1 ORDER BY id DESC LIMIT 1'

        const result = await pool.execute(query, [owner_id])

        return result[0][0]
    }

    /* MEMBERS */

    static async addWorkspaceMember(belongs_to, user_id, admin) {

        

        const query = admin ? 'INSERT INTO Workspace_members(belongs_to, user_id, role) VALUES(?, ?, 1)' :
        'INSERT INTO Workspace_members(belongs_to, user_id) VALUES(?, ?)'

        const result = await pool.execute(query, [belongs_to, user_id])

        return result
    }




    static async deleteWorkspaceMember(belongs_to, user_id) {

        const query = 'DELETE FROM Workspace_members WHERE belongs_to = ? AND user_id = ?'

        const result = await pool.execute(query, [belongs_to, user_id])

        return result
    }






    static async getWorkspaceMembers(belongs_to) {

        const query = `SELECT * FROM workspace_members
INNER JOIN Users ON workspace_members.user_id = Users.id
WHERE workspace_members.belongs_to = ?`

        const result = await pool.execute(query, [belongs_to])

        return result[0]
    }

    static async getWorkspaceAdmin(workspaceName){

        const query = 'SELECT user_id FROM workspace_members WHERE belongs_to = ? AND role = 1'

        const result = await pool.execute(query, [workspaceName])

        return result[0][0].user_id
    }


    static async getMemberWorkspaces(user_id) {
        const query = `SELECT Workspaces.* FROM Workspace_members
        INNER JOIN Workspaces
        ON workspace_members.belongs_to = workspaces.name
        WHERE user_id = ? AND active = 1
        `

        const result = await pool.execute(query, [user_id])

        return result[0]
    }




    /*     static async s() {
    
            const query = ''
    
            const result = await pool.execute(query, [])
    
            return result[0][0]
        } */








}