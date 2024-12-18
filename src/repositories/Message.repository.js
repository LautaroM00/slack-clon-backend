import pool from "../config/db.mysql.config.js"

export default class MessageRepository {

    static async getChannelMessages(channel_id) {

        const query = `SELECT messages.*, users.name FROM Messages
INNER JOIN users
ON messages.sender_id = users.id
WHERE channel_id = ? AND messages.active = 1
ORDER BY sent_at ASC`

        const result = await pool.execute(query, [channel_id])

        return result[0]
    }

    static async createMessage(channel_id, sender_id, content) {

        const query = 'INSERT INTO Messages(channel_id, sender_id, content) VALUES(?, ?, ?)'

        const result = await pool.execute(query, [channel_id, sender_id, content])

        return result
    }



    static async deleteMessage(message_id) {

        const query = 'UPDATE Messages SET active = 0 WHERE id = ?'

        const result = await pool.execute(query, [message_id])

        return result[0]
    }

    static async getLastChannelMessage(channel_id) {

        const query = `SELECT messages.*, users.name FROM Messages
INNER JOIN users
ON messages.sender_id = users.id
WHERE channel_id = ? AND messages.active = 1
ORDER BY sent_at DESC LIMIT 1`

        const result = await pool.execute(query, [channel_id])

        return result[0]
    }

}