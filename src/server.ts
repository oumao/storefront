import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import apiRoutes from './routes/index.route'

const app: express.Application = express()
const address = '0.0.0.0:3000' as string

app.use(bodyParser.json())

// Routes
app.use('/', apiRoutes)

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})
