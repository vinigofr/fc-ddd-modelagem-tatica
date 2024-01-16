import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";
import ProductOverpriced from "../entity/productOverpriced";

type Type = "OVERPRICED" | "DEFAULT";

export default abstract class ProductFactory {
  public static create(name: string, price: number, type?: Type): ProductInterface {
    switch (type) {
      case "OVERPRICED":
        return new ProductOverpriced(uuid(), name, price)
      default:
        return new Product(uuid(), name, price)
    }

  }
}