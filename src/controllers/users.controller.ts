import express, { Request, Response } from 'express'
import {User, UserModel } from '../models/users.model'

// Instantiating user model
const userStore = new UserModel()


// Controller to create user
const registerUser = async (_req: Request, res: Response) => {
    try {

        const user =  {
            username: _req.body.username,
            firstName: _req.body.firstName,
            lastName: _req.body.las,
            password_digest: _req.body.password_digest
        }

        const result = await userStore.createUser(user)

        

    } catch (error) {
        res.status(400).json("Couldnot Create User")
    }
}

// Controller to create user
const getUsers = async (_req: Request, res: Response) => {
    try {

        
    } catch (error) {
        res.status(400).json("Couldnot Create User")
    }
}


// Controller to create user
const getUser = async (_req: Request, res: Response) => {
    try {

        
    } catch (error) {
        res.status(400).json("Couldnot Create User")
    }
}

// Controller to create user
const editUser = async (_req: Request, res: Response) => {
    try {

        
    } catch (error) {
        res.status(400).json("Couldnot Create User")
    }
}

// Controller to create user
const removeUser = async (_req: Request, res: Response) => {
    try {

        
    } catch (error) {
        res.status(400).json("Couldnot Create User")
    }
}