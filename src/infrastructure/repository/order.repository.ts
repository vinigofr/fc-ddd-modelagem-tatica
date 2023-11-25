import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

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
    throw new Error("Method not implemented.");
  }

  async find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}