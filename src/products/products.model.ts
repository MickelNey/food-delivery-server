import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Order} from "../orders/orders.model";
import {OrdersProducts} from "../orders_products/orders_products.model";
import {ProductsCategories} from "../categories/products-categories.model";
import {Category} from "../categories/categories.model";

interface ProductCreationAttrs {
  title: string
  imageUrl: string
  costForCompany: number
  cost: number
  quantity: number
}


@Table({tableName: 'products'})
export class Product extends Model<Product, ProductCreationAttrs> {
  @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @Column({type: DataType.STRING, allowNull: false})
  imageUrl: string;

  @Column({type: DataType.STRING, allowNull: true})
  description: string;

  @Column({type: DataType.INTEGER, allowNull: false})
  costForCompany: number;

  @Column({type: DataType.INTEGER, allowNull: false})
  cost: number;

  @Column({type: DataType.INTEGER, allowNull: false})
  quantity: number

  @BelongsToMany(() => Category, () => ProductsCategories)
  categories: Category[]

  @HasMany(() => OrdersProducts)
  orders: OrdersProducts[]
}
