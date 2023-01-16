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

userRoutes.route('/users').get(getUsers, verifyToken).post(registerUser, verifyToken)
userRoutes.route('/users/:id').get(getUser, verifyToken).put(editUser, verifyToken).delete(removeUser, verifyToken)

export default userRoutes
