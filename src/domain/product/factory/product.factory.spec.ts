import ProductFactory from "./product.factory"

describe('Product factory unit tests', () => {
  test('should create a product A', () => {
    const productA = ProductFactory.create("Product", 1)

    expect(productA.id).toBeDefined()
    expect(productA.name).toBe('Product')
    expect(productA.price).toBe(1)
    expect(productA.constructor.name).toBe("Product")
  })

  test('should create a overpriced product', () => {
    const productA = ProductFactory.create("ProductOverpriced", 1, "OVERPRICED")

    expect(productA.id).toBeDefined()
    expect(productA.name).toBe('ProductOverpriced')
    expect(productA.price).toBe(5)
    expect(productA.constructor.name).toBe("ProductOverpriced")
  })
})