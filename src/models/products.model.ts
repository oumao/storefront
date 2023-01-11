import client from "../database/database"

export type Product = {
    id?: number,
    name: string,
    price: number
}


export class ProductModel {

    // Create a Product
    async create(p: Product): Promise<Product> {
        try {
            const conn = await client.connect()

            const sql = `INSERT INTO products (name, price) VALUES($1, $2) RETURNING *`

            const result = await conn.query(sql, [p.name, p.price])

            conn.release()

            return result.rows
        } catch (error) {
            throw new Error(`Couldnot add new product. Error ${error}`)
        }
    }


    // Get list of Products
    async getAllProducts(): Promise<Product []> {
        try {
            const conn = await client.connect()

            const sql = `SELECT * FROM products`

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (error) {
            throw new Error(`Couldnot retrieve List of Products. Error ${error}`)
        }
    }

    // Get Single specific Product
    async getSingleProduct(id: number): Promise<Product> {
        try {
            const conn = await client.connect()

            const sql = `SELECT * FROM products WHERE id=$1`

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(`Couldnot retrieve the Product ${id}. Error ${error}`)
        }
    }

    // Update Product Method
    async updateSingleProduct(p: Product): Promise<Product> {
        try {
            const conn = await client.connect()

            const sql = `UPDATE Products SET name=$2, price=$3 WHERE id=$1 RETURNING *`

            const result = await conn.query(sql, [p.id, p.name, p.price])

            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(`Couldnot update the product. Error ${error}`)
        }
    }

    // Delete Product method
    async deleteSingleProduct(id: number): Promise<Product> {
        try {
            const conn = await client.connect()

            const sql = `DELETE FROM products WHERE id=$1`

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(`Couldnot delete the Product ${id}. Error ${error}`)
        }
    }

    
}