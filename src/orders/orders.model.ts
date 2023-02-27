import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {OrdersProducts} from "../orders_products/orders_products.model";
import {User} from "../users/users.model";

interface OrderCreationAttrs {
  status: string
  address: string
  registrationDate: string
  customerEmail: string
}

@Table({tableName: 'orders'})
export class Order extends Model<Order, OrderCreationAttrs> {
  @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  status: string;

  @Column({type: DataType.STRING, allowNull: false})
  customerEmail: string;

  @Column({type: DataType.DATE, allowNull: false})
  registrationDate: string;

  @Column({type: DataType.STRING, allowNull: true})
  time: string;

  @Column({type: DataType.STRING, allowNull: true})
  address: string;

  @Column({type: DataType.INTEGER, allowNull: false})
  price: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: true})
  userId: number;

  @BelongsTo(() => User)
  customer: User

  @HasMany(() => OrdersProducts)
  products: OrdersProducts[]
}
