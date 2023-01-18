import supertest from 'supertest'
import app from '../../server'
import dotenv from 'dotenv'
import { ProductModel } from '../../models/products.model'
import { UserModel } from '../../models/users.model'
import { OrderModel } from '../../models/orders.model'
import { createToken } from '../utilities/createToken'


dotenv.config()

const request = supertest(app)
const productStore = new ProductModel()
const userStore = new UserModel() 
const orderStore = new OrderModel()


describe("Dashboard Endpoints Suite", () =>{
    let token: string
    
    describe('[GET] api/dashboard/user-order', () => {
        

        // beforeAll(async () => {
        //     // await productStore.create({
        //     //     name: 'Sonytech',
        //     //     price: 200.0,
        //     //   })
          
        //     //   await userStore.createUser({
        //     //     username: 'test_oumao',
        //     //     firstName: 'John',
        //     //     lastName: 'Doe',
        //     //     password_digest: 'password123',
        //     //   })
      
        //     //   await orderStore.create({
        //     //       user_id: 1,
        //     //       status: "ACTIVE"
        //     //   })
      
        //     //   await orderStore.createOrderWithProducts({
        //     //       quantity: 3,
        //     //       order_id: 1,
        //     //       product_id: 1
        //     //   })

              
        // })
        
        it("Should get specific user with a specific order", async () => {

            
             const response = await request
                 .post('/api/dashboard/user-order')
                 .set('Authorization', `Bearer ${token}`)
                 .query({ user_id: 100})
                 .expect(200)
                 
            expect(response.body).toEqual({
                firstName: "John",
                lastName: "Doe",
                id: 1,
                status: "ACTIVE"
            })

        })


        it("Should return 404 incase user not found", async () => {
            const response = await request
                    .get('/api/dashboard/user-order')
                    .set('Authorization', `Bearer ${token}`)
                    .query({ user_id: 100})

            expect(response.status).toEqual(404)
        })


        it("should return 400 if an error occurs", async () => {
            // Simulate an error by passing an invalid user_id
            const response = await request
                .get('/dashboard/user-order')
                .set('Authorization', `Bearer ${token}`)
                .query({user_id: 'invalid_id'});
        
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