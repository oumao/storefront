import { Product, ProductModel } from '../models/products.model'
import { Request, Response } from 'express'

const productStore = new ProductModel()

const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productStore.getAllProducts()

    res.status(200).json(products)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getProduct = async (_req: Request, res: Response) => {
  try {
    const product = await productStore.getSingleProduct(
      _req.params.id as unknown as number
    )

    if (!product) {
      res.status(404).json(`The product doesnt exist!`)
    } else {
      res.status(200).json(product)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

const createProduct = async (_req: Request, res: Response) => {
  try {
    const productObject = {
      name: _req.body.name,
      price: _req.body.price,
    }

    const products = await productStore.create(productObject)

    res.status(200).json(products)
  } catch (error) {
    res.status(400).json(error)
  }
}

const updateProduct = async (_req: Request, res: Response) => {
  try {
    const product = await productStore.getSingleProduct(
      _req.params.id as unknown as number
    )

    if (!product) {
      res.status(404).json(`The product doesnt exist!`)
    } else {
      const productObject = {
        id: product.id,
        name: _req.body.name,
        price: _req.body.price,
      }
      const result = await productStore.updateSingleProduct(productObject)
      res.status(200).json(result)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

const deleteProduct = async (_req: Request, res: Response) => {
  try {
    const product = await productStore.getSingleProduct(
      _req.params.id as unknown as number
    )

    if (!product) {
      res.status(404).json(`The product doesnt exist!`)
    } else {
      const result = await productStore.deleteSingleProduct(
        _req.params.id as unknown as number
      )
      res
        .status(200)
        .json(`Product with id ${_req.params.id} has been deleted!`)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct }
