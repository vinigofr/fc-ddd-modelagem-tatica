import Order from '../entity/order';
import OrderItem from '../entity/order_item';

interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    price: number;
    quantity: number
  }[]
}

export default abstract class OrderFactory {
  static create(orderProps: OrderFactoryProps): Order {
    const items = orderProps.items.map(({ id, name, price, productId, quantity }) => {
      return new OrderItem(id, name, price, productId, quantity)
    })

    const order = new Order(orderProps.id, orderProps.customerId, items)

    return order;
  }
}