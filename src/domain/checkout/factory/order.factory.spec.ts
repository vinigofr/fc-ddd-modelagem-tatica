import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("Order factory unit tests", () => {
  test("should create a new order", () => {
    const props = {
      id: uuid(),
      customerId: uuid(),
      items: [{
        id: uuid(),
        name: "Product name",
        productId: uuid(),
        quantity: 100,
        price: 100
      }],
    };

    const order = OrderFactory.create(props)

    expect(order.id).toBeDefined();
    expect(order.items.length).toBeGreaterThan(0)
  })
})