import {
  getUserOrder,
  getUsersOrders,
  getProductsOrder,
  checkoutOrder,
} from '../controllers/dashboard.controller'
import express from 'express'

const dashboardRoutes = express.Router()

dashboardRoutes.route('/dashboard/user-order').get(getUserOrder)
dashboardRoutes.route('/dashboard/users-orders').get(getUsersOrders)
dashboardRoutes.route('/cart/:orderId').get(getProductsOrder)
dashboardRoutes.route('/users/:userId/checkout/:orderId').put(checkoutOrder)

export default dashboardRoutes
