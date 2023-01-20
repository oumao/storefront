import supertest from 'supertest'
import app from '../../server'
import dotenv from 'dotenv'
import { createToken } from '../utilities/createToken'

dotenv.config()

const request = supertest(app)
const token = createToken(1, 'tokenizer')

describe("Product Endpoints Suite", () =>{

    
    it("api/productcs [POST] should create a Product",async () => {
        const p = {
            name: 'Sonytech',
            price: 12.5,
          }

        request
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send(p)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                user_id: 1,
                status: 'ACTIVE'
            })
    })



    it("api/products [GET] should retrieve products", async () => {
        request
            .get('/api/products/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect({
                id: 1,
                name: "Sonytech",
                price: 12.5
            })
    })

    it("api/products/:id [GET] should retrieve a Product", async () => {
        request
            .get('/api/products/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect({
                id: 1,
                name: "Sonytech",
                price: 12.5
            })
    })

    it("api/products/1 [PUT] should update an Order", async () => {
        const od = {
            id: 1,
            name: "TechSony",
            price: 13.70
        }

        request
            .put('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send(od)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                name: "TechSony",
                price: 13.70
            })
    })

    it("api/products/1 [DELETE] should delete a product",async () => {
        request
            .get('/api/products/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect({
                id: 1,
                name: "Sonytech",
                price: 12.5
            })
    })
})