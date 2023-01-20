import supertest from "supertest"
import app from  '../../server'
import dotenv from 'dotenv'


dotenv.config()

const request = supertest(app)


describe("User Endpoints Suite", () =>{

    it("api/users [GET] should retrieve Users",async () => {
        const response = await request
                    .get("/api/users")
                    .expect(200)
            
            expect(response.body.username).toEqual("testUser")
            expect(response.body.firstname).toEqual("John")
    })

    it("api/users/:id [GET] should retrieve a User",async () => {
        const response = await request
                .get("/api/users/1")
                .expect(200)

        expect(response.body.username).toEqual("testUser")
        expect(response.body.firstname).toEqual("John")
    })

    it("api/users/:id [PUT] should update a User",async () => {


        const response = await request
                .put("/api/users/1")
                .send({
                    username: "testuser",
                    password_digest:  "password",
                    firstName: "Evans",
                    lastName: "Doe"
                })
                .expect(200)

        expect(response.body.username).toEqual("testuser")
        expect(response.body.firstname).toEqual("Evans")
    })

    it("api/users/:id [DELETE] should delete a User",async () => {
        await request
            .delete("/api/users/1")
            .expect(200)

        const response = await request
            .get("/api/users/1")
            .expect(404)

    expect(response.body).toEqual({})
    })
})