import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ProductsCategories} from "./products-categories.model";
import {Product} from "../products/products.model";

interface CategoryCreationAttrs {
  title: string
  imageUrl: string;
}

@Table({tableName: 'categories'})
export class Category extends Model<Category, CategoryCreationAttrs> {
  @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @Column({type: DataType.STRING, allowNull: false})
  imageUrl: string;

  @BelongsToMany(() => Product, () => ProductsCategories)
  products: Product[]
}
