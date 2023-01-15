import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Request, Response } from "express"
import { User, UserModel } from "../models/users.model"


const userStore = new UserModel()

export const userSignIn = async (_req: Request, res: Response) => {
    try {
        const {username, password_digest } = _req.body 

        const user = await userStore.getUserByUsername(username)

        if(!user) throw new Error(`User not Found`)
        console.log(user.password_digest);
        
        const isPasswordMatch = await bcrypt.compare(
            password_digest + process.env.BCRYPT_SECRET as string, 
            user.password_digest
        )

        if(!isPasswordMatch) throw new Error(`Invalid password`)

        const tokenPayload = {
            userId: user.id,
            username: user.username
        }

        const token = jwt.sign(
           tokenPayload,
           process.env.TOKEN_SECRET as string,
           { expiresIn: '1d'}
        )
        
        res.status(200).json({ token })
        
    } catch (error: any) {
        res.status(401).json(error.message)
    }
}

export const userSignUp = async (_req: Request, res: Response) => {
    try {
        const user = _req.body as unknown as User
        user.password_digest= await bcrypt.hashSync(
            user.password_digest + process.env.BCRYPT_SECRET as string, 
            parseInt(process.env.SALT_ROUNDS as string))
        const data = await userStore.createUser(user)

        res.status(200).json(data)
    } catch (error: any) {
        res.status(400).json(error.message)
    }
}