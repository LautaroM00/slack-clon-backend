import pool from "../config/db.mysql.config.js";

export default class WorkspaceRepository {

    static async createWorkspace(name, owner_id) {

        const query = 'INSERT INTO Workspaces(name, owner_id) VALUES(?, ?)'

        const result = pool.execute(query, [name, owner_id])

        return result
    }

    static async getUserWorkspaces(owner_id) {

        const query = 'SELECT * FROM Workspaces WHERE owner_id = ? AND active = 1'

        const result = await pool.execute(query, [owner_id])

        return result[0]
    }

    static async deleteWorkspace(name, owner_id) {

        const query = 'UPDATE Workspaces SET active = 0 WHERE name = ? AND owner_id = ?'

        const result = await pool.execute(query, [name, owner_id])

        return result[0]['changedRows']
    }

/*     static async s() {

        const query = ''

        const result = await pool.execute(query, [])

        return result[0][0]
    } */



}