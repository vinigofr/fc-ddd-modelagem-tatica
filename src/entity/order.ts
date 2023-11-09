import OrderItem from "./order_item";

export default class Order {
  _id: string;

  // Se estão em diferentes agregados, fazemos a relação por ID
  _customerId: string;

  // Se a relação está no mesmo agregado pelo objeto/classe
  _items: OrderItem[] = [];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id= id;
    this._customerId= customerId;
    this._items = items
  }
}
