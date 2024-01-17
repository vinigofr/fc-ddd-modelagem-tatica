import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      // É necessário fazer um map aqui pois no OrderModel, temos um
      // relacionamento @HasMany para OrderItems. Por isso, precisamos
      // realizar um map para mapear corretamente como OrderItemModel deve receber
      // este conteúdo.
      items: order.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      }))
    }, {
      include: [{ model: OrderItemModel }]
    })
  }

  async update(order: Order): Promise<void> {
    try {
      await OrderModel.findOne({ where: { id: order.id }, rejectOnEmpty: true })
    } catch (error) {
      throw new Error("Order not found");
    }

    await OrderModel.update({ customer_id: order.customerId }, { where: { id: order.id } })
  }

  async find(id: string): Promise<Order> {
    let orderModel;

    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: ["items"]
      })
    } catch (error) {
      throw new Error("Order not found");
    }

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map((item: OrderItemModel) => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity,
      )))
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ["items"] })

    return orderModels.map((orderModel) => new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map((item: OrderItemModel) => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity,
      ))));
  }
}