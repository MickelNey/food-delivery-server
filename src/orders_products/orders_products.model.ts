import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Order} from "../orders/orders.model";
import {Product} from "../products/products.model";

interface ProductOrdersAttr {
  volume: number;
  productId: number;
  orderId: number
}


@Table({tableName: 'products_orders', createdAt: false, updatedAt: false})
export class OrdersProducts extends Model<OrdersProducts, ProductOrdersAttr> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  })
  id: number;

  @Column({
    type: DataType.INTEGER
  })
  volume: number

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    unique: false
  })
  productId: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    unique: false
  })
  orderId: number;

  @BelongsTo(() => Order)
  orders: Order

  @BelongsTo(() => Product)
  products: Product
}
