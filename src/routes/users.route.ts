import express, { Router } from 'express'
import  { registerUser, getUsers, getUser, editUser, removeUser } from '../controllers/users.controller'

const userRoutes: Router = express.Router()


userRoutes.route("/users").get(getUsers).post(registerUser)
userRoutes.route("/users/:id").get(getUser).put(editUser).delete(removeUser)

export default userRoutes