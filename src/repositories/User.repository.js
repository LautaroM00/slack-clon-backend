import pool from "../config/db.mysql.config.js"
import bcrypt from 'bcrypt'

class UserRepository {

    static async createUser(userData){

        const { email, name, password } = userData

        const query = 'INSERT INTO Users(email, name, password) VALUES(?,?,?)'

        const result = await pool.execute(query, [email, name, password])

        return result
    }

    static async verifyUser(email){

        const query = 'UPDATE Users SET is_validated = true WHERE email = ?'

        const result = await pool.execute(query, [email])

        return result
    }

    static async getUser(email){

        const query = 'SELECT * FROM Users WHERE email = ?'

        const result = await pool.execute(query, [email])

        return result[0][0]
    }

    static async changeUserPassword(password, email){

        const hashedPassword = await bcrypt.hash(password, 10)

        const query = 'UPDATE Users SET password = ? WHERE email = ?'

        const result = await pool.execute(query, [hashedPassword, email])

        return result
    }

    static async s(){

        const query = ''

        const result = await pool.execute()

        return result
    }


}

export default UserRepository