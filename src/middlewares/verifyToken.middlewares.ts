import {NextFunction, Request, Response} from "express"
import jwt from 'jsonwebtoken'
import { UserModel } from "../models/users.model"

const userStore = new UserModel()

export const verifyToken =async (_req: Request, res: Response, next: NextFunction) => {
    try {

        // Access the token from headers
        const authToken = _req.headers.authorization?.split(" ")[1]

        if(!authToken) throw new Error("Token Missing!")

        // Verify the validity of the token
        const decodeToken = jwt.verify(authToken, process.env.TOKEN_SECRET as string)

        if(!decodeToken) throw new Error("Invalid token")

        // Get the user using the decoded token
        const user = await userStore.getUserByUsername((decodeToken as any).username)
        if(!user) throw new Error("Invalid token")

        res.locals.user = user
        next()
    } catch (error: any) {
       res.status(401).json(error.message) 
    }
}