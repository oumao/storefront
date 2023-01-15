import express, { Router } from 'express'
import {
  userSignIn,
  userSignUp
} from '../controllers/auth.controller'

const authRoutes: Router = express.Router()

authRoutes.route('/auth/sign-up').post(userSignUp)
authRoutes.route("/auth/sign-in").post(userSignIn)


export default authRoutes
