export default class OrderItem {
  // ID do item
  private _id: string;
  private _productId: string
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number,
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;

    this.validate();
  }

  validate() {
    if (this._quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }
  }

  get price(): number {
    return this._price;
  }

  get id(): string {
    return this._id;
  }

  get quantity(): number {
    return this._quantity;
  }

  get name(): string {
    return this._name;
  }

  get total(): number {
    return this._price * this._quantity;
  }

  get productId(): string {
    return this._productId;
  }
}