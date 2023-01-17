import { Order, OrderModel } from '../../models/orders.model'
import { ProductModel } from '../../models/products.model'
import { UserModel } from '../../models/users.model'
import exec from 'child_process'

const orderStore = new OrderModel()
const productStore = new ProductModel()
const userStore = new UserModel()

describe('Order Model Suite', () => {
  beforeAll(async () => {
    
    await productStore.create({
      name: 'Sonytech',
      price: 200.0,
    })

    // await userStore.createUser({
    //   username: 'test_john',
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   password_digest: 'password123',
    // })
  })

  afterAll((done) => {
    exec.exec(`db-migrate --env test reset`, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(stdout)
      done()
    })
  })

  it('Should create an order', async () => {
    const order = {
      user_id: 1,
      status: 'ACTIVE',
    }

    const result = await orderStore.create(order)

    expect(result[0].id).toBe(2)
    expect(result[0].status).toBe('ACTIVE')
  })

  it('Should return list of orders', async () => {
    const result: Order[] = await orderStore.getAllOrders()

    expect(result[1].id).toBe(2)
    expect(result[1].status).toBe('ACTIVE')
  })

  it('Should return an order', async () => {
    const result = await orderStore.getSingleOrder(2)

    expect(result.id).toBe(2)
    expect(result.status).toBe('ACTIVE')
  })

  it('Should update an order', async () => {
    const orders = await orderStore.getAllOrders()

    const orderId = orders[0].id

    const order = {
      id: orderId as number,
      user_id: 1,
      status: 'COMPLETED',
    }

    const result = await orderStore.updateSingleOrder(order)

    expect(result.id).toBe(1)
    expect(result.status).toBe('COMPLETED')
  })

  it('Should add product to an Order', async () => {
    const ord = {
      quantity: 2,
      order_id: 1,
      product_id: 1
    }
    const result = await orderStore.createOrderWithProducts(ord)

    expect(result.quantity).toBe(2)
    expect(parseInt(result.order_id as unknown as string)).toBe(1)
    expect(parseInt(result.product_id as unknown as string)).toBe(1)
  })

  it('Should delete an order', async () => {
    let orders = await orderStore.getAllOrders()

    const orderId = orders[0].id as unknown as number

    const result = await orderStore.deleteSingleOrder(orderId)

    orders = await orderStore.getAllOrders()

    expect(orders.length).toBe(1)
  })
})
