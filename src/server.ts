import express from 'express'
import bodyParser from 'body-parser'
import apiRoutes from './routes/index.route'
import cors from 'cors'

const app: express.Application = express()
const address = '0.0.0.0:3000' as string

const corsOptions = {
  origin: '*',
  optionsSucccessStatus: 200
}


app.use(bodyParser.json())

// Routes
app.use('/api', apiRoutes)

// Middlewares
app.use(cors(corsOptions))

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})

export default app
