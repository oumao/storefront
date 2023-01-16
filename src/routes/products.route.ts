import express, { Router } from 'express'
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller'
import { verifyToken } from '../middlewares/verifyToken.middlewares'

const productRoutes: Router = express.Router()

productRoutes.route('/products').get(verifyToken, getProducts).post(verifyToken, createProduct)
productRoutes
  .route('/products/:id')
  .get(verifyToken, getProduct)
  .put(verifyToken, updateProduct)
  .delete(verifyToken, deleteProduct)

export default productRoutes
