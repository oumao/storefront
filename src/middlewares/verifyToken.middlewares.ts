import {NextFunction, Request, Response} from "express"
import jwt from 'jsonwebtoken'
import { UserModel } from "../models/users.model"

const userStore = new UserModel()

export const verifyToken =async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = _req.headers.authorization?.split(" ")[1]

        if(!authToken) throw new Error("Token Missing!")
        const decodeToken = jwt.verify(authToken, process.env.TOKEN_SECRET as string)

        if(!decodeToken) throw new Error("Invalid token")

        const user = await userStore.getUserByUsername((decodeToken as any).username)
        if(!user) throw new Error("Invalid token")

        res.locals.user = user
        next()
    } catch (error: any) {
       res.status(401).json(error.message) 
    }
}