import { Product, ProductModel } from '../../models/products.model'

const productStore = new ProductModel()

describe('Product Model', () => {


  it('Should create a product', async () => {
    const p = {
      name: 'Sonytech',
      price: 12.5,
    }
    const result = await productStore.create(p)

    expect(result[0].name).toBe(p.name)
    expect(parseFloat(result[0].price as unknown as string)).toEqual(p.price)
  })

  it('Should retrieve a list of products', async () => {
    const result = await productStore.getAllProducts()

    expect(result[0].name).toBe("Sonytech")
  })


  it('Should retrieve a specific product', async () => {
    const products = await productStore.getAllProducts()
    const productId = products[0].id as number
    const result = await productStore.getSingleProduct(productId)

    expect(result.name).toBe("Sonytech")
  })

  it('should update a specific product',async () => {
    const products = await productStore.getAllProducts()
    const productId = products[0].id as number
    

    const p = {
        id: productId,
        name: 'Sony woofer',
        price: 23.45
    }

    const result = await productStore.updateSingleProduct(p)

    expect(parseFloat(result.price as unknown as string)).toEqual(p.price)
    expect(result.name).toBe(p.name)
    
  })

  it('Should delete a specific product', async () => {
    let orders = await productStore.getAllProducts()
    const orderId = orders[0].id as number
    await productStore.deleteSingleProduct(orderId)
    orders = await productStore.getAllProducts()
    expect(orders.length).toBe(1)
  })


})
