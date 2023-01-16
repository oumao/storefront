import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const { TOKEN_SECRET } = process.env

export const createToken = (id: number, username: string): string => {
    return jwt.sign({id, username}, TOKEN_SECRET as string)
}