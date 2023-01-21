import supertest from "supertest"
import app from  '../../server'
import dotenv from 'dotenv'
import { createToken } from "../utilities/createToken"


dotenv.config()

const request = supertest(app)
const token = createToken(1, 'tokenizer')

describe("User Endpoints Suite", () =>{

    it("api/users [GET] should retrieve Users",async () => {
        request
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect({
                id: 1,
                username: "testUser",
                firstName: "John",
                lastName: "Doe"
            })
            
    })

    it("api/users/:id [GET] should retrieve a User",async () => {
        request
            .get('/api/users/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect({
                id: 1,
                username: "testUser",
                firstName: "John",
                lastName: "Doe"
            })
    })

    it("api/users/:id [PUT] should update a User",async () => {
        const u = {
            username: "testUser",
            password_digest:  "password",
            firstName: "Evans",
            lastName: "Doe"
        }

        request
            .get('/api/users/1')
            .set('Authorization', `Bearer ${token}`)
            .send(u)
            .expect(200)
            .expect({
                id: 1,
                username: "testUser",
                firstName: "Evans",
                lastName: "Doe"
            })
    })

    it("api/users/:id [DELETE] should delete a User",async () => {
        request
            .get('/api/users/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect({
                id: 1,
                username: "testUser",
                firstName: "Evans",
                lastName: "Doe"
            })
    })
})