import Product from "./product"

describe("Product unit tests", () => {
  test("should throw error when id is required", () => {
    expect(() => {
      new Product("", "Product 1", 100)
    }).toThrow("Id is required")
  })

  test("should throw error when name is required", () => {
    expect(() => {
      new Product("123", "", 100)
    }).toThrow("Name is required")
  })

  test("should throw error when price is less than zero", () => {
    expect(() => {
      new Product("123", "Product name", -1)
    }).toThrow("Price must be greater than zero")
  })

  test("should change product name", () => {
    const product = new Product("123", "Product name", 100)
    product.changeName("Product name 2")
    expect(product.name).toBe("Product name 2")
  })

  test("should change product price", () => {
    const product = new Product("123", "Product name", 100)
    product.changePrice(150)
    expect(product.price).toBe(150)
  })
})