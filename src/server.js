import express from 'express'
import cors from 'cors'
import ENVIROMENT from './config/ENVIROMENT.js'
import pool from './config/db.mysql.config.js'
import emailTransporter from './config/email/email.transporter.js'
import authRouter from './routes/auth.route.js'
import testRouter from './test/test.route.js'
import workspaceRouter from './routes/workspace.route.js'
import channelRouter from './routes/channel.route.js'
import messageRouter from './routes/message.route.js'


const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/workspace', workspaceRouter)
app.use('/api/channel', channelRouter)
app.use('/api/message', messageRouter)

app.use('/api/test', testRouter)

app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto http://localhost:${PORT}`)
})