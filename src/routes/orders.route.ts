import express, { Router } from 'express'
import {
  createOrder,
  createProductOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orders.controller'
import { verifyToken } from '../middlewares/verifyToken.middlewares'

const orderRoutes: Router = express.Router()

orderRoutes.route('/orders').get(getOrders, verifyToken).post(createOrder, verifyToken)
orderRoutes
  .route('/orders/:id')
  .get(getOrder, verifyToken)
  .put(updateOrder, verifyToken)
  .delete(deleteOrder, verifyToken)
orderRoutes
  .route('/orders/:orderId/products/:productId')
  .post(createProductOrder, verifyToken)

export default orderRoutes
