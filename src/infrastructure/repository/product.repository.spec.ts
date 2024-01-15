import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/product/entity/product";
import ProductRepository from "./product.repository";


describe("Product repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  });

  afterEach(async () => {
    await sequelize.close();
  })

  test("should create a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } })

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100
    })
  })

  test("should update a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 100);
    productRepository.create(product);

    product.changeName("CHANGED");
    product.changePrice(1)

    productRepository.update(product)
    const productModel = await ProductModel.findOne({ where: { id: "1" } })

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "CHANGED",
      price: 1
    })
  })

  test("should find a product by id", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } })
    const foundProduct = await productRepository.find("1")

    expect(productModel?.toJSON()).toStrictEqual({
      id: foundProduct?.id,
      name: foundProduct?.name,
      price: foundProduct?.price
    })
  })

  test("should find all", async () => {
    const product1 = new Product("1", "Product 1", 100).toJSON();
    const product2 = new Product("2", "Product 2", 200).toJSON();
    const product3 = new Product("3", "Product 3", 300).toJSON();

    const model1 = await ProductModel.create(product1)
    const model2 = await ProductModel.create(product2)
    const model3 = await ProductModel.create(product3)

    const allProducts = await new ProductRepository().findAll()
    expect(allProducts.length).toBe(3)

    expect(model1.toJSON()).toStrictEqual(product1)
    expect(model2.toJSON()).toStrictEqual(product2)
    expect(model3.toJSON()).toStrictEqual(product3)
  })
})