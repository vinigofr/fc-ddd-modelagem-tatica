import Order from "./order"
import OrderItem from "./order_item"

describe("customer unit tests", () => {
  test("throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", [new OrderItem("1", "name", 1, "p1", 50)])
    }).toThrow("id is required")
  })

  test("throw error when customerId is empty", () => {
    expect(() => {
      new Order("123", "", [new OrderItem("1", "name", 1, "p1", 50)])
    }).toThrow("customerId is required")
  })

  test("throw error when items list is empty", () => {
    expect(() => {
      new Order("123", "123", [])
    }).toThrow("order items must not to be empty")
  })

  test("should calculate total", () => {
    const items = [
      new OrderItem("1", "name", 100, "p1", 25),
      new OrderItem("2", "name", 200, "p2", 26),
      new OrderItem("3", "name", 300.35, "p3", 27),
    ]

    expect(new Order("123", "123", items).total()).toBe(
      items.reduce((acc, item) => acc + item.total, 0)
    )
  })
})