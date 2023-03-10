import { DashboardQueries } from '../models/dashboard.service'
import { Request, Response } from 'express'
import { OrderModel } from '../models/orders.model'

const dashboard = new DashboardQueries()
const orderStore = new OrderModel()

export const getUserOrder = async (_req: Request, res: Response) => {
  try {
    // Pick userId from params
    const userId = _req.params.userId

    // Retrieve orders using the userId
    const result = await dashboard.getUserWithOrder(userId as unknown as number)

    if (!result) {
      res.status(404).json(`No user with id ${userId}`)
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const getUsersOrders = async (_req: Request, res: Response) => {
  try {
    // Retrieving active orders
    const result = await dashboard.getUsersWithOrders()
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const getProductsOrders = async (_req: Request, res: Response) => {
  try {
    // Retrieving products added to orders
    const result = await dashboard.getProductsInOrders()
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const getProductsOrder = async (_req: Request, res: Response) => {
  try {
    const orderId = _req.params.orderId as unknown as number

    const result = await dashboard.getProductsInOrder(orderId)

    if (!result) {
      res.status(404).json(`No order with id ${orderId}`)
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error)
  }
}

// Checkout a user order
export const checkoutOrder = async (_req: Request, res: Response) => {
  try {
    const orderId = _req.params.orderId as unknown as number
    const userId = _req.params.userId as unknown as number

    const orderExist = await orderStore.getSingleOrder(orderId)

    //Check if an order exists
    if (orderExist) {

      // Confirm the status before processing
      if (orderExist.status === 'ACTIVE') {
        orderExist.status = 'COMPLETE'

        // Checking out the order
        const result = await dashboard.checkOutOrder(
          orderId,
          userId,
          orderExist.status
        )

        res.status(200).json(result)
      } else {
        res.status(400).json(`Order ${orderId} is already checkouted out!!`)
      }
    } else {
      res.status(404).json(`The order ${orderId} doesnot exist!!`)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}
