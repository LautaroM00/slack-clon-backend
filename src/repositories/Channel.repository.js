import pool from "../config/db.mysql.config.js"

export default class ChannelRepository {

    static async createChannel(belongs_to, owner_id, channelName){

        const query = 'INSERT INTO Channels(belongs_to, owner_id, name) VALUES(?, ?, ?)'

        const result = await pool.execute(query, [belongs_to, owner_id, channelName])

        return result

    }


    static async deleteChannel(belongs_to, channelName){

        const query = 'UPDATE Channels SET active = 0 WHERE name = ? AND belongs_to = ?'

        const result = await pool.execute(query, [channelName, belongs_to])

        return result

    }

    static async getChannels(belongs_to){

        const query = 'SELECT * FROM Channels WHERE belongs_to = ? AND active = 1'

        const result = await pool.execute(query, [belongs_to])

        return result[0]
    }

}
