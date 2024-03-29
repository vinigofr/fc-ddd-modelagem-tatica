import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Address from "../../../../domain/customer/value-object/address";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model"
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";


describe("Order repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([OrderModel, CustomerModel, OrderItemModel, ProductModel])
    await sequelize.sync()
  });

  afterEach(async () => {
    await sequelize.close();
  })

  test("should create an order", async () => {
    // Customer
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", "1", "Zipcode 1", "City 1")
    customer.changeAddress(address)
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer)

    // Product
    const product = new Product("1", "Maçã", 5);
    const productRepository = new ProductRepository();
    await productRepository.create(product)

    // Order
    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("1", customer.id, [orderItem])
    const orderRepository = new OrderRepository();
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"] // Este 'items' é o nome declarado no model, ele precisa ser o mesmo para que funcione
    })

    expect(orderModel?.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "123",
      total: 10,
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          quantity: orderItem.quantity,
          price: orderItem.price,
          order_id: order.id,
          product_id: orderItem.productId
        }
      ]
    })
  })

  test("should retrieve an order by id", async () => {
    // Customer
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", "1", "Zipcode 1", "City 1")
    customer.changeAddress(address)
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer)

    // Product
    const product = new Product("1", "Maçã", 5);
    const productRepository = new ProductRepository();
    await productRepository.create(product)

    // Order
    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("1", customer.id, [orderItem])
    const orderRepository = new OrderRepository();
    await orderRepository.create(order)

    // Getting an order via Model and Repository and comparing them
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [
        "items",
      ],
    })

    const retrievedOrder = await orderRepository.find(order.id);
    const { items } = retrievedOrder;

    expect(orderModel?.toJSON()).toStrictEqual({
      id: retrievedOrder.id,
      customer_id: retrievedOrder.customerId,
      total: retrievedOrder.total(),
      items: [
        {
          id: items[0].id,
          name: items[0].name,
          quantity: items[0].quantity,
          price: items[0].price,
          order_id: retrievedOrder.id,
          product_id: items[0].productId
        }
      ]
    })
  })

  test("should throw an error when order cannnot be found", async () => {
    const orderRepository = new OrderRepository();
    expect(async () => orderRepository.find("ABC123")).rejects.toThrow(new Error("Order not found"))
  })

  test("should return all orders", async () => {
    // Customer
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", "1", "Zipcode 1", "City 1")
    customer.changeAddress(address)
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer)

    // Product
    const product = new Product("1", "Maçã", 5);
    const productRepository = new ProductRepository();
    await productRepository.create(product)

    // Orders
    const orders = [
      new Order("1", customer.id, [new OrderItem("1", product.name, product.price, product.id, 2)]),
      new Order("2", customer.id, [new OrderItem("2", product.name, product.price, product.id, 2)]),
    ]

    const orderRepository = new OrderRepository();
    await orderRepository.create(orders[0])
    await orderRepository.create(orders[1])

    // Getting all orders via Model and Repository and comparing them
    const orderModels = await OrderModel.findAll({ include: ['items'] })
    const retrievedOrders = await orderRepository.findAll();

    expect(orderModels.length).toBe(2);
    expect(retrievedOrders.length).toBe(2);

    expect(orderModels[0]?.toJSON()).toStrictEqual({
      id: retrievedOrders[0].id,
      customer_id: retrievedOrders[0].customerId,
      total: retrievedOrders[0].total(),
      items: [
        {
          id: retrievedOrders[0].items[0].id,
          name: retrievedOrders[0].items[0].name,
          quantity: retrievedOrders[0].items[0].quantity,
          price: retrievedOrders[0].items[0].price,
          order_id: retrievedOrders[0].id,
          product_id: retrievedOrders[0].items[0].productId
        }
      ]
    })
    expect(orderModels[1]?.toJSON()).toStrictEqual({
      id: retrievedOrders[1].id,
      customer_id: retrievedOrders[1].customerId,
      total: retrievedOrders[1].total(),
      items: [
        {
          id: retrievedOrders[1].items[0].id,
          name: retrievedOrders[1].items[0].name,
          quantity: retrievedOrders[1].items[0].quantity,
          price: retrievedOrders[1].items[0].price,
          order_id: retrievedOrders[1].id,
          product_id: retrievedOrders[1].items[0].productId
        }
      ]
    })
  })

  test("should update customer_id from an order", async () => {
    // Customer
    const customer = new Customer("123", "Customer 1");
    const customer2 = new Customer("456", "Customer 2");
    const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
    const address2 = new Address("Street 2", "2", "Zipcode 2", "City 2")
    customer.changeAddress(address);
    customer2.changeAddress(address2)
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);
    await customerRepository.create(customer2)

    // Product
    const product = new Product("1", "Maçã", 5);
    const productRepository = new ProductRepository();
    await productRepository.create(product)

    // Order
    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("1", customer.id, [orderItem])
    const orderRepository = new OrderRepository();
    await orderRepository.create(order)

    let orderModel = await OrderModel.findOne({ where: { customer_id: customer.id }, include: ["items"] });
    expect(orderModel?.toJSON().customer_id).toBe("123");

    order.changeCustomer(customer2.id)
    await orderRepository.update(order)

    orderModel = await OrderModel.findOne({ where: { customer_id: customer2.id }, include: ["items"] });
    expect(orderModel?.toJSON().customer_id).toBe("456")
  })

  test("should throw an error when order cannnot be updated", async () => {
    const order = new Order("1", "1", [new OrderItem("1", "name", 10, "1", 1)])
    const orderRepository = new OrderRepository();
    expect(async () => orderRepository.update(order)).rejects.toThrow(new Error("Order not found"))
  })
})