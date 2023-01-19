import supertest from "supertest"
import app from  '../../server'
import dotenv from 'dotenv'
import jwt from  'jsonwebtoken'
import { UserModel } from "../../models/users.model"
import { userSignUp } from "../../controllers/auth.controller"


dotenv.config()

const request = supertest(app)
const userStore = new UserModel()

describe("Authentication Suite", () => {
    describe('[POST] /api/auth/sign-up', () => {
        it('Should create a new User', async () => {
            const response = await request
                    .post("/api/auth/sign-up")
                    .send({
                        username: "testUser",
                        password_digest:  "password",
                        firstName: "John",
                        lastName: "Doe"
                    })
                    .expect(200)
            
            expect(response.body.username).toEqual("testUser")
            expect(response.body.firstname).toEqual("John")
        })
    })

    describe('[POST] /api/auth/sign-in', () => {
        it('Should sign in an existing user', async () => {

            
            const response = await request
            .post("/api/auth/sign-in")
            .send({
                username: "testUser",
                password_digest:  "password"
            })

            const verToken = jwt.verify(response.body.token, process.env.TOKEN_SECRET as string)

            expect((verToken as any).username).toEqual("testUser")

        });
    });

})


