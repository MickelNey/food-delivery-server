import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Order} from "../orders/orders.model";

interface UserCreationAttrs {
  name: string
  email: string
  password: string
}


@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  name: string

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  secondName: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  address: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]

  @HasMany(() => Order)
  orders: Order[]
}
