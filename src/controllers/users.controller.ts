import { Request, Response } from 'express'
import dotenv from 'dotenv'
import { User, UserModel } from '../models/users.model'

dotenv.config()

// Instantiating user model
const userStore = new UserModel()

// Controller to create user
const registerUser = async (_req: Request, res: Response) => {
  try {
    const userObject = {
      username: _req.body.username,
      firstName: _req.body.firstName,
      lastName: _req.body.lastName,
      password_digest: _req.body.password_digest,
    }

    const userExists = await userStore.getUserByUsername(userObject.username)

    if (userExists) {
      res
        .status(400)
        .json(`User with username ${userObject.username} already exists!!`)
    } else {
      const user = await userStore.createUser(userObject)

      res.status(201).json(user)
    }
  } catch (error) {
    res.json(error)
  }
}

// Controller to create user
const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userStore.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.json(error)
  }
}

// Controller to create user
const getUser = async (_req: Request, res: Response) => {
  const userId = _req.params.id as unknown as number
  try {
    const user = await userStore.getUserById(userId)

    if (!user) {
      res.status(404).json(`No user with id ${userId} found!`)
    }

    res.status(200).json({
     user
    })
  } catch (error) {
    res.status(400).json(error)
  }
}

// Controller to create user
const editUser = async (_req: Request, res: Response) => {
  const userId = _req.params.id as unknown as number
  try {
    const user = await userStore.getUserById(userId)

    // check if user doesnt exist
    if (!user) {
      res.status(404).json(`User with id ${userId} doesnot exist!`)
    } else {
      const userObject = {
        id: parseInt(_req.params.id as string),
        username: _req.body.username as string,
        firstName: _req.body.firstName as string,
        lastName: _req.body.lastName as string,
        password_digest: _req.body.password_digest as string,
      }

      // update user
      const result = await userStore.updateUser(userObject)
      console.log(result)
      res.status(200).json(result)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

// Controller to create user
const removeUser = async (_req: Request, res: Response) => {
  const userId = _req.params.id as unknown as number
  try {
    const user = await userStore.getUserById(userId)

    // check if user doesnt exist
    if (!user) {
      res.status(404).json(`User with id ${userId} doesnot exist!`)
    } else {
      // delete user from the database
      await userStore.deleteUser(userId)

      res.status(200).json(`User successfully deleted`)
    }
  } catch (error) {
    res.status(400).json('Couldnot delete User ')
  }
}

export { registerUser, getUsers, getUser, editUser, removeUser }
