
import Product from "../entity/product";
import ProductService from "./product.service";


describe("Product service unit tests", () => {
  test("should change price of all products", () => {
    const products = [
      new Product("1", "p1", 100),
      new Product("2", "p2", 200),
    ]

    ProductService.increasePrice(products, 100);

    expect(products[0].price).toBe(200);
    expect(products[1].price).toBe(400);
  });

  test("should be ok", () => {
    expect(true).toBeTruthy();
  });
})