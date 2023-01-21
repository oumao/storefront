import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Request, Response } from "express"
import { User, UserModel } from "../models/users.model"

// creating a userStore object
const userStore = new UserModel()



export const userSignIn = async (_req: Request, res: Response) => {
    try {

        // Pulling data from json request body
        const {username, password_digest } = _req.body 


        // Checking if username exists
        const user = await userStore.getUserByUsername(username)

        if(!user) throw new Error(`User not Found`)
        
        // Comparing password hashes
        const isPasswordMatch = await bcrypt.compareSync(
            password_digest + process.env.BCRYPT_SECRET as string, 
            user.password_digest
        )

        if(!isPasswordMatch) throw new Error(`Invalid password`)
        
        // Creating a payload to pass to jwt
        const tokenPayload = {
            userId: user.id,
            username: user.username
        }

        // Generate token for the signed in user
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

        // Hashing password before saving to the db
        user.password_digest = await bcrypt.hashSync(
            user.password_digest + process.env.BCRYPT_SECRET as string, 
            parseInt(process.env.SALT_ROUNDS as string))
        
        // Saving user to the db
        const data = await userStore.createUser(user)

        res.status(200).json(data)
    } catch (error: any) {
        res.status(400).json(error.message)
    }
}