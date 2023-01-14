import client from '../database/database'
import { OrderProduct } from '../types/order.products.types'

export type Order = {
  id?: number
  status: string
  user_id: number
}

export class OrderModel {
  // Create an Order
  async create(o: Order): Promise<Order[]> {
    try {
      const conn = await client.connect()

      const sql = `INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *`

      const result = await conn.query(sql, [o.user_id, o.status])

      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Couldnot create order. Error ${error}`)
    }
  }

  // Create an Order with Products
  async createOrderWithProducts(po: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect()

      const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *`

      const result = await conn.query(sql, [
        po.quantity,
        po.order_id,
        po.product_id,
      ])

      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldnot create products in an order. Error ${error}`)
    }
  }

  // Get list of Orders
  async getAllOrders(): Promise<Order[]> {
    try {
      const conn = await client.connect()

      const sql = `SELECT * FROM orders`

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Couldnot retrieve orders. Error ${error}`)
    }
  }

  // Get Single specific Order
  async getSingleOrder(id: number): Promise<Order> {
    try {
      const conn = await client.connect()

      const sql = `SELECT * FROM orders WHERE id=$1`

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldnot retrieve the order ${id}. Error ${error}`)
    }
  }

  // Update Order Method
  async updateSingleOrder(o: Order): Promise<Order> {
    try {
      const conn = await client.connect()

      const sql = `UPDATE orders SET user_id=$2, status=$3 WHERE id=$1 RETURNING *`

      const result = await conn.query(sql, [o.id, o.user_id, o.status])

      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldnot update the order. Error ${error}`)
    }
  }

  // Delete Order method
  async deleteSingleOrder(id: number): Promise<Order> {
    try {
      const conn = await client.connect()

      const sql = `DELETE FROM orders WHERE id=$1`

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldnot delete the order ${id}. Error ${error}`)
    }
  }
}
