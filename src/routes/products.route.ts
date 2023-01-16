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

productRoutes.route('/products').get(getProducts, verifyToken).post(createProduct, verifyToken)
productRoutes
  .route('/products/:id')
  .get(getProduct, verifyToken)
  .put(updateProduct, verifyToken)
  .delete(deleteProduct, verifyToken)

export default productRoutes
