import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model"
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
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
})