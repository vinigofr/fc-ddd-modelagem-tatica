import {
  Column,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript'
import ProductModel from './product.model';
import OrderModel from './order.model';

@Table({
  tableName: 'order_items',
  timestamps: false,
})
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  // Esta é uma forma que o sequelize encontra para fazer os relacionamentos.
  // Primeiro, conseguimos armazenar o id do produto no qual o mesmo se relaciona com Order Item
  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare product_id: string;

  // Logo abaixo fazemos um @BelongsTo com o Product inteiro, para caso precisarmos da informação
  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  // O mesmo caso de cime se repete abaixo, com order_id e order
  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare order_id: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
} 