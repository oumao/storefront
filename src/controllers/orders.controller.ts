import { Order, OrderModel } from "../models/orders.model"
import { Request, Response } from "express"


const orderStore = new OrderModel()

const getOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await orderStore.getAllOrders()

        res.status(200).json(orders)
        
    } catch (error) {
        res.status(400).json(error)
    }
}


const getOrder = async (_req: Request, res: Response) => {
    try {
        const order = await orderStore.getSingleOrder(_req.params.id as unknown as number)

        if(!order){
            res.status(404).json(`The order doesnt exist!`)
        }else{
            res.status(200).json(order)
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}


const createOrder = async (_req: Request, res: Response) => {
    try {


        const orderObject = {
            user_id: _req.body.user_id,
            status: _req.body.status
        }

        const orders = await orderStore.create(orderObject)

        res.status(200).json(orders)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

const createProductOrder = async (_req: Request, res: Response) => {
    try {
        const orderId = _req.params.orderId as unknown as number
        const productId = _req.params.productId as unknown as number
        const qty = _req.body.quantity
        
        const orderProductObject = {
            quantity: qty,
            order_id: orderId,
            product_id: productId
        }

        const result = await orderStore.createOrderWithProducts(orderProductObject)
        res.status(200).json(result)
        
    } catch (error) {
        res.status(400).json(error)
    }
}


const updateOrder = async (_req: Request, res: Response) => {
    try {

        const order = await orderStore.getSingleOrder(_req.params.id as unknown as number)

        if(!order){
            res.status(404).json(`The order doesnt exist!`)
        }else{
            const orderObject = {
                id: order.id,
                user_id: _req.body.user_id,
                status: _req.body.status
            }
            const result = await orderStore.updateSingleOrder(orderObject)
            res.status(200).json(result)
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}


const deleteOrder = async (_req: Request, res: Response) => {
    try {

        const order = await orderStore.getSingleOrder(_req.params.id as unknown as number)

        if(!order){
            res.status(404).json(`The order doesnt exist!`)
        }else{
            const result = await orderStore.deleteSingleOrder(_req.params.id as unknown as number)
            res.status(200).json(`Order with id ${_req.params.id} has been deleted!`)
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

export {
    createOrder,
    createProductOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder
}