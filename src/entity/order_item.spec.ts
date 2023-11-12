import OrderItem from "./order_item"

describe("Order Item unit tests", () => {
  test("should throw error if items quantity is less than zero", () => {
    const items = [
      ,
    ]

    expect(() => new OrderItem("1", "name", 100, "p1", -25)).toThrow("Quantity must be greater than 0")
  })
})

