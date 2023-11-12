import OrderItem from "./order_item";

export default class Order {
  _id: string;

  // Se estão em diferentes agregados, fazemos a relação por ID
  _customerId: string;

  // Se a relação está no mesmo agregado pelo objeto/classe
  _items: OrderItem[] = [];

  _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items
    this._total = this.total();

    this.validate()
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("id is required")
    }

    if (this._customerId.length === 0) {
      throw new Error("customerId is required")
    }

    if (this._items.length < 1) {
      throw new Error("order items must not to be empty")
    }
  }

  total(): number {
    let total: number = 0;
    this._items.forEach(item => {
      total += item.total;
    })

    return total
  }
}
