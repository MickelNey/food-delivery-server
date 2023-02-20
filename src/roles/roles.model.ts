import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";

interface RolesCreationAttrs {
  value: string,
  description: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RolesCreationAttrs> {

  @ApiProperty({example: '1', description: 'unique id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({example: 'ADMIN', description: 'value of the user role'})
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  value: string;

  @ApiProperty({example: 'administrator', description: 'role description'})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}
