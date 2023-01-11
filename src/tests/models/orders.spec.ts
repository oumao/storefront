import { OrderModel } from "../../models/orders.model"

const orderStore = new OrderModel()

xdescribe("Order Model Suite", () => {

    it("Should create an order", async () =>{
        const order = {
            user_id: 2,
            status: "NEW"
        }

        const result = await orderStore.create(order)

        expect(result.id).toBe(1)
        expect(result.status).toBe("NEW")
        expect(result.user_id).toBe(2)
    })

    it("Should return list of orders", async () =>{
        const result = await orderStore.getAllOrders()

        expect(result[0].id).toBe(1)
        expect(result[0].user_id).toBe(2)
    })

    it("Should return an order", async () =>{
        const result = await orderStore.getSingleOrder(1)

        expect(result.id).toBe(1)
        expect(result.status).toBe("NEW")
        expect(result.user_id).toBe(2)
    })

    it("Should update an order", async () =>{
        const orders = await orderStore.getAllOrders()

        const orderId = orders[0].id as unknown as number

        const order = {
            id: orderId,
            user_id: 2,
            status: "COMPLETED"
        }

        const result = await orderStore.create(order)

        expect(result.id).toBe(1)
        expect(result.status).toBe("COMPLETED")
        expect(result.user_id).toBe(2)
    })

    it("Should delete an order", async () =>{
        let orders = await orderStore.getAllOrders()

        const orderId = orders[0].id as unknown as number

        const result = await orderStore.deleteSingleOrder(orderId)

        orders = await orderStore.getAllOrders()

        expect(orders.length).toBe(0)

    })

})