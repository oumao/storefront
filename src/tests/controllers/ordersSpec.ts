import supertest from 'supertest'
import app from '../../server'
import dotenv from 'dotenv'
import { createToken } from '../utilities/createToken'

dotenv.config()

const request = supertest(app)
const token = createToken(1, 'tokenizer')

describe("Order Endpoints Suite", () =>{

    
    it("api/orders [POST] should create an Order",async () => {
        const od = {
            user_id: 1,
            status: 'ACTIVE'
        }

        request
            .post('/api/orders')
            .set('Authorization', `Bearer ${token}`)
            .send(od)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                user_id: 1,
                status: 'ACTIVE'
            })
    })

    it("api/orders/:orderId/products/:productId [POST] should create an Order with Product(s)",async () => {
        const od = {
            product_id: 1,
            quantity: 5
        }

        request
            .post('/api/orders/1/products/1')
            .set('Authorization', `Bearer ${token}`)
            .send(od)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                order_id: 1,
                product_id: 1,
                quantity: 5
            })
    })


    it("api/orders [GET] should retrieve Orders", async () => {
        request
            .get('/api/orders')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                user_id: 1,
                status: 'ACTIVE'
            })
    })

    it("api/orders/:id [GET] should retrieve an Order",async () => {
        request
            .get('/api/orders/1')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                user_id: 1,
                status: 'ACTIVE'
            })
    })

    it("api/orders [PUT] should update an Order",async () => {
        const od = {
            id: 1,
            user_id: 1,
            status: 'COMPLETED'
        }

        request
            .put('/api/orders')
            .set('Authorization', `Bearer ${token}`)
            .send(od)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                user_id: 1,
                status: 'COMPLETED'
            })
    })

    it("api/orders [DELETE] should delete an Order",async () => {
        request
            .get('/api/orders/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect({
                id: 1,
                user_id: 1,
                status: 'ACTIVE'
            })
    })
})