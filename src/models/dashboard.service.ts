import client from '../database/database'

export class DashboardQueries {
  async getUserWithOrder(
    user_id: string
  ): Promise<
    { firstName: string; lastName: string; id: number; status: string }[]
  > {
    try {
      const conn = await client.connect()
      const sql = `SELECT u.firstName, u.lastName, o.id, o.status FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE u.id=($1)`
      const result = await conn.query(sql, [user_id])

      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(
        `Couldnt retrieve user ${user_id} who have placed an order`
      )
    }
  }

  async getUsersWithOrders(): Promise<
    { firstName: string; lastName: string; id: number; status: string }[]
  > {
    try {
      const conn = await client.connect()
      const sql = `SELECT u.firstName, u.lastName, o.id, o.status FROM users u INNER JOIN orders o ON u.id = o.user_id`
      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Couldnt retrieve users who have placed orders`)
    }
  }

  async getProductsInOrders(): Promise<
    { name: string; price: number; order_id: number }[]
  > {
    try {
      const conn = await client.connect()
      const sql = `SELECT p.name, p.price, op.order_id FROM products p INNER JOIN order_products op ON p.id = op.product_id`
      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Couldnt retrieve products in orders`)
    }
  }

  async getProductsInOrder(
    orderId: number
  ): Promise<{ name: string; price: number; quantity: number }[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT p.name, p.price, op.quantity FROM products p INNER JOIN order_products op ON p.id = op.product_id WHERE op.order_id=($1)`
      const result = await conn.query(sql, [orderId])

      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Couldnt retrieve products in order ${orderId}`)
    }
  }

  async checkOutOrder(
    orderId: number,
    userId: number,
    status: string
  ): Promise<{ id: number; status: string; user_id: number }> {
    try {
      const conn = await client.connect()
      const sql = `UPDATE orders SET status=$3 WHERE id=$1 and user_id=$2 RETURNING *`
      const result = await conn.query(sql, [orderId, userId, status])

      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldnt checkout order ${orderId}`)
    }
  }
}
