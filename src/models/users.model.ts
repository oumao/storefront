import client from '../database/database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const { SALT_ROUNDS, BCRYPT_SECRET } = process.env

export type User = {
  id?: number
  username: string
  firstName: string
  lastName: string
  password_digest: string
}

export class UserModel {
  async createUser(u: User): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = `INSERT INTO users (username, firstName, lastName, password_digest) VALUES($1, $2, $3, $4) RETURNING *`

      // Generating hashed password using bcrypt
      u.password_digest = bcrypt.hashSync(
        u.password_digest + BCRYPT_SECRET,
        parseInt(SALT_ROUNDS as string)
      )

      const result = await conn.query(sql, [
        u.username,
        u.firstName,
        u.lastName,
        u.password_digest,
      ])

      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldnot create user ${u.username}. Error ${error}`)
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM users WHERE id=$1`

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldnot retrieve user ${id}. Error ${error}`)
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM users WHERE username=$1`

      const result = await conn.query(sql, [username])

      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldnot retrieve user ${username}. Error ${error}`)
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT id, username, firstName, lastName FROM users`

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Couldnot retrieve user list. Error ${error}`)
    }
  }

  async updateUser(u: User): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = `UPDATE users SET username=$2, firstName=$3, lastName=$4, password_digest=$5 WHERE id=$1 RETURNING *`
      u.password_digest = bcrypt.hashSync(
        u.password_digest + BCRYPT_SECRET,
        parseInt(SALT_ROUNDS as string)
      )
      const result = await conn.query(sql, [
        u.id,
        u.username,
        u.firstName,
        u.lastName,
        u.password_digest,
      ])
      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldnot update user ${u.id}. Error ${error}`)
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = `DELETE FROM users WHERE id=$1`

      const result = await conn.query(sql, [id])
      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldnot delete user ${id}. Error ${error}`)
    }
  }
}
