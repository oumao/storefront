import {
  getUserOrder,
  getUsersOrders,
  getProductsOrder,
  checkoutOrder,
} from '../controllers/dashboard.controller'
import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.middlewares'

const dashboardRoutes = express.Router()

dashboardRoutes.route('/dashboard/user-order').get(verifyToken, getUserOrder)
dashboardRoutes.route('/dashboard/users-orders').get(verifyToken, getUsersOrders)
dashboardRoutes.route('/cart/:orderId').get(verifyToken, getProductsOrder)
dashboardRoutes.route('/users/:userId/checkout/:orderId').put(verifyToken, checkoutOrder)

export default dashboardRoutes
