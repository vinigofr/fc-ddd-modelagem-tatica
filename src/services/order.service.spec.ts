import Customer from "../entity/customer";
import Order from "../entity/order"
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order Service unit tests", () => {

  test("should increase reward points from a customer using the order service", () => {
    const customer = new Customer("1", "cust1");
    const item = new OrderItem("1", "prod1", 10, "10", 1);

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  test("should get total price of all orders", () => {
    const orderItems = [
      new OrderItem("1", "product1", 1, "26", 2),
      new OrderItem("2", "product2", 3, "27", 2),
      new OrderItem("3", "product3", 2, "36", 2),
    ];

    // Três pessoas diferentes fizeram pedidos do mesmo item
    const orders = [
      new Order("1", "1", orderItems),
      new Order("2", "2", orderItems),
      new Order("3", "3", orderItems),
    ]

    const total = OrderService.total(orders);

    expect(total).toBe(36);
  })

})