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

orderRoutes.route('/orders').get(verifyToken, getOrders).post(verifyToken, createOrder)
orderRoutes
  .route('/orders/:id')
  .get(verifyToken, getOrder)
  .put(verifyToken, updateOrder)
  .delete(verifyToken, deleteOrder)
orderRoutes
  .route('/orders/:orderId/products/:productId')
  .post(verifyToken, createProductOrder)

export default orderRoutes
