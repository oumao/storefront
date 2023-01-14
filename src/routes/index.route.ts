import express, { Router } from 'express'
import userRoutes from './users.route'
import orderRoutes from './orders.route'
import productRoutes from './products.route'
import dashboardRoutes from './dashboard.route'

const apiRoutes: Router = express.Router()

apiRoutes.use('/', userRoutes)
apiRoutes.use('/', orderRoutes)
apiRoutes.use('/', productRoutes)
apiRoutes.use('/', dashboardRoutes)

export default apiRoutes
