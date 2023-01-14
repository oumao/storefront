import express, { Router } from 'express'
import {
  createOrder,
  createProductOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orders.controller'

const orderRoutes: Router = express.Router()

orderRoutes.route('/orders').get(getOrders).post(createOrder)
orderRoutes
  .route('/orders/:id')
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder)
orderRoutes
  .route('/orders/:orderId/products/:productId')
  .post(createProductOrder)

export default orderRoutes
