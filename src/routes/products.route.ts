import express, { Router } from "express"
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../controllers/products.controller"

const productRoutes: Router = express.Router()


productRoutes.route("/products").get(getProducts).post(createProduct)
productRoutes.route("/products/:id").get(getProduct).put(updateProduct).delete(deleteProduct)


export default productRoutes



