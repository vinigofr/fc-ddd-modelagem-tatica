import Product from "../../domain/product/entity/product";
import ProductRepositoryInterface from "../../domain/product/repository/product.repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price
    })
  }

  async update(product: Product): Promise<void> {
    await ProductModel.update({
      name: product.name, price: product.price
    }, { where: { id: product.id } })
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({
      where: {
        id
      }
    })

    const product = new Product(id, productModel?.name || '', productModel?.price || -1)

    return product
  }

  async findAll(): Promise<Product[]> {
    const productModel = await ProductModel.findAll()

    const products: Product[] = []

    productModel.forEach(product => {
      products.push(new Product(product.id, product.name, product.price))
    })

    return products
  }
}