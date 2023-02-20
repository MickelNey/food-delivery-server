import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {OrdersService} from "../orders/orders.service";
import {ChangeUserInfoDto} from "./dto/change-user-info.dto";

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    private orderService: OrdersService
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)

    console.log(user.id)

    const role = await this.roleService.getRoleByValue('USER')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user
  }

  async getAllUsers() {
    return await this.userRepository.findAll({include: {all: true}})
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
    if (user) {
      return user
    }
  }

  async changeUser(dto: ChangeUserInfoDto) {
    try {
      const user = await this.getUserByEmail(dto.email)

      user.address = dto.address
      user.name = dto.name
      user.secondName = dto.secondName
      user.phone = dto.phone

      await user.save()
      return user
    }
    catch (e) {
      throw new UnauthorizedException({message: 'Пользователь не найден'})
    }
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findOne({ where: {id: dto.userId}, include: {all: true}} )
    const role = await this.roleService.getRoleByValue(dto.value)
    if (role && user) {
      await user.$add('role', role.id)
      user.roles.push(role)

      return user
    }
    throw new HttpException('user or role not found', HttpStatus.NOT_FOUND)
  }
}
