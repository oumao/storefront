import { DashboardQueries } from "../../models/dashboard.service"
import { OrderModel } from "../../models/orders.model"
import { ProductModel } from "../../models/products.model"
import { UserModel } from "../../models/users.model"
import exec from 'child_process'

const dashboard = new DashboardQueries()
const productStore = new ProductModel()
const userStore = new UserModel()
const orderStore = new OrderModel()

describe("Dashboard Queries", () =>{

    beforeAll(async () => {
        await productStore.create({
          name: 'Sonytech',
          price: 200.0,
        })
    
        await userStore.createUser({
          username: 'test_john',
          firstName: 'John',
          lastName: 'Doe',
          password_digest: 'password123',
        })

        await orderStore.create({
            user_id: 1,
            status: "ACTIVE"
        })

        await orderStore.createOrderWithProducts({
            quantity: 3,
            order_id: 1,
            product_id: 1
        })
      })
    

    it("Should get specific user with a specific order", async () => {
        const result = await dashboard.getUserWithOrder(1)
        expect(result[0].status).toBe("ACTIVE")
    })

    it("Should get users with placed orders", async () => {
        const result = await dashboard.getUsersWithOrders()
        expect(result.length).toBe(1)
        expect(result[0].status).toBe("ACTIVE")
    })

    it("Should get products in a specific order", async () => {
        const result = await dashboard.getProductsInOrder(1)
        expect(result.length).toBe(1)
        expect(result[0].name).toBe("Sonytech")
        expect(result[0].quantity).toBe(3)
    })


    it("Should checkout an Order", async () => {
        const result = await dashboard.checkOutOrder(1, 1, "COMPLETED")
        expect(result.status).toBe("COMPLETED")
    })
})