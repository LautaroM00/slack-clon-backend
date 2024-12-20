import pool from "../config/db.mysql.config.js"

export default class ChannelRepository {

    static async createChannel(belongs_to, owner_id, channelName){

        const query = 'INSERT INTO Channels(belongs_to, owner_id, name) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE active = IF(active = 0, 1, active);'

        const result = await pool.execute(query, [belongs_to, owner_id, channelName])

        return result

    }


    static async deleteChannel(belongs_to, channelId){

        const query = 'UPDATE Channels SET active = 0 WHERE id = ? AND belongs_to = ?'

        const result = await pool.execute(query, [channelId, belongs_to])

        return result

    }

    static async getChannels(belongs_to){

        const query = 'SELECT * FROM Channels WHERE belongs_to = ? AND active = 1'

        const result = await pool.execute(query, [belongs_to])

        return result[0]
    }

    static async getChannelByName(belongs_to, channel_name){

        const query = 'SELECT * FROM Channels WHERE belongs_to = ? AND name = ? AND active = 1 ORDER BY id DESC LIMIT 1'

        const result = await pool.execute(query, [belongs_to, channel_name])

        return result[0]
    }

}
