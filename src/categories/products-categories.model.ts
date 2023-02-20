import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../products/products.model";
import {Category} from "./categories.model";

@Table({tableName: 'products_categories', createdAt: false, updatedAt: false})
export class ProductsCategories extends Model<ProductsCategories> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER
  })
  productId: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER
  })
  categoryId: number;

}
