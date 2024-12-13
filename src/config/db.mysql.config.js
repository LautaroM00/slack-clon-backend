import mysql from 'mysql2/promise'
import ENVIROMENT from './ENVIROMENT.js'

const pool = mysql.createPool({
    host: ENVIROMENT.MYSQL.HOST,
    user: ENVIROMENT.MYSQL.USERNAME,
    password: ENVIROMENT.MYSQL.PASSWORD,
    database: ENVIROMENT.MYSQL.DATABASE
})

pool.getConnection()
.then((connection) => {
    console.log('Conexión a db exitosa.')
    connection.release()
})
.catch((err) => {
    console.log('Error de conexión: ', err)
})

export default pool