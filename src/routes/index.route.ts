import express, { Router } from 'express'
import userRoutes from './users.route'
import orderRoutes from './orders.route'
import productRoutes from './products.route'

const apiRoutes: Router = express.Router()

apiRoutes.use("/", userRoutes)
apiRoutes.use("/", orderRoutes)
apiRoutes.use("/", productRoutes)


export default apiRoutes