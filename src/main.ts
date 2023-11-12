import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "Vinicius");
const address = new Address("rua", "numero", "zip", "city")

customer.Address = address
customer.activate();

const items = [
  new OrderItem("123", "name1", 1.250, "p1", 10),
  new OrderItem("456", "name2", 1.10, "p2", 10),
  new OrderItem("789", "name3", 1000.01, "p3", 10),
];

const order = new Order("123", "123", items)