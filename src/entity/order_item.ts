export default class OrderItem {
  // ID do item
  _id: string;
  _name: string;
  _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
  }

  get price() {
    return this._price;
  }

}