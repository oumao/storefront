import supertest from 'supertest'
import app from '../../server'
import dotenv from 'dotenv'
import jwt from  'jsonwebtoken'
import { ProductModel } from '../../models/products.model'
import { UserModel } from '../../models/users.model'
import { OrderModel } from '../../models/orders.model'
import { createToken } from '../utilities/createToken'


dotenv.config()

const request = supertest(app)
// const productStore = new ProductModel()
// const userStore = new UserModel() 
// const orderStore = new OrderModel()


describe("Dashboard Endpoints Suite", () =>{
    let token: any
    
    describe('[GET] api/dashboard/user-order', () => {
        

        beforeAll(async () => {
            const user = await request
            .post("/api/auth/sign-in")
            .send({
                username: "testUser",
                password_digest:  "password"
            })

            token = user.body
              
        })
        
        it("Should get specific user with a specific order", async () => {

        
            const response = await request
                .post('/api/dashboard/user-order')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                 
            console.log(response.body)
            expect(response.body).toEqual({
                firstName: "John",
                lastName: "Doe",
                id: 1,
                status: "ACTIVE"
            })

        })


        it("Should return 404 incase user not found", async () => {
            const response = await request
                    .get('/api/dashboard/user-order/1')
                    .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(404)
        })


        it("should return 400 if an error occurs", async () => {
            // Simulate an error by passing an invalid user_id
            const response = await request
                .get('/dashboard/user-order/inval')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(400);
            expect(response.body).toEqual({
                message: 'Invalid user_id'
            });
        });
        

    })
    
    // Write jasmine test for endpoint api/dashboard/users-orders

    

    // it("api/dashboard/users-orders [GET] should get users with placed orders",async () => {

    //     request
    //         .post('/api/dashboard/users-orders')
    //         .set('Authorization', `Bearer ${token}`)
    //         .expect('Content-Type', 'application/json')
    //         .expect(200)
    //         .expect({
    //             firstName: "John",
    //             lastName: "Doe",
    //             id: 1,
    //             status: "ACTIVE"
    //         })
    // })


    // it("api/cart/:orderId [GET] should retrieve products in a order", async () => {
    //     const od = {
    //         orderId: 1
    //     }
    //     request
    //         .get('/api/cart/1')
    //         .set('Authorization', `Bearer ${token}`)
    //         .send(od)
    //         .expect('Content-Type', 'application/json')
    //         .expect(200)
    //         .expect({
    //             name: "Sonytech",
    //             price: 200.0,
    //             quantity: 3
    //         })
    // })

    // it("api/users/:userId/checkout/:orderId [GET] should checkout an order",async () => {
    //     const od = {
    //         orderId: 1,
    //         userId: 1,
    //         status: "COMPLETED"
    //     }
    //     request
    //         .get('/api/users/1/checkout/1')
    //         .set('Authorization', `Bearer ${token}`)
    //         .send(od)
    //         .expect('Content-Type', 'application/json')
    //         .expect(200)
    //         .expect({
    //            id: 1,
    //            user_id: 1,
    //            status: "COMPLETED"
    //         })
    // })

})