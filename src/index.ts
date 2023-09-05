import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router';

require('dotenv').config()
const url = process.env.MONGO_URL

const app = express()

app.use(cors({
  credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

mongoose.Promise = Promise;
mongoose.connect(url)
  .then(() => {
    console.log('Mongodb connected successfully')
  })
  .catch((error) => {
    throw new Error('Connection error')
  })
// mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router())

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080')
})