import express, { Router } from 'express'
import {
  registerUser,
  getUsers,
  getUser,
  editUser,
  removeUser,
} from '../controllers/users.controller'
import { verifyToken } from '../middlewares/verifyToken.middlewares'

const userRoutes: Router = express.Router()

userRoutes.route('/users').get(verifyToken, getUsers).post(verifyToken, registerUser)
userRoutes.route('/users/:id').get(verifyToken, getUser).put(verifyToken, editUser).delete(verifyToken, removeUser)

export default userRoutes
