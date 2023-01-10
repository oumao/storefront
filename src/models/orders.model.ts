import client from "../database/database"

export type Order = {
    id?: number,
    status: string,
    user_id: number
}


export class OrderModel {
    async create(o: Order): Promise<Order> {
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

    async getAllOrders(): Promise<Order []> {
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

    async updateSingleOrder(id: number, ): Promise<Order> {
        try {
            const conn = await client.connect()

            const sql = `UPDATE orders SET status=$2 WHERE id=$1`

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(`Couldnot create order. Error ${error}`)
        }
    }

    async getSingleOrder(id: number): Promise<Order> {
        try {
            const conn = await client.connect()

            const sql = `SELECT * FROM orders WHERE id=$1`

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(`Couldnot create order. Error ${error}`)
        }
    }
}