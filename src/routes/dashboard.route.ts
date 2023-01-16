import {
  getUserOrder,
  getUsersOrders,
  getProductsOrder,
  checkoutOrder,
} from '../controllers/dashboard.controller'
import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.middlewares'

const dashboardRoutes = express.Router()

dashboardRoutes.route('/dashboard/user-order').get(getUserOrder, verifyToken)
dashboardRoutes.route('/dashboard/users-orders').get(getUsersOrders, verifyToken)
dashboardRoutes.route('/cart/:orderId').get(getProductsOrder, verifyToken)
dashboardRoutes.route('/users/:userId/checkout/:orderId').put(checkoutOrder, verifyToken)

export default dashboardRoutes
