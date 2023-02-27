import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard} from 'src/auth/jwt-auth.guard'
import {Roles} from "../auth/roles-auth.decorator";
import {AddRoleDto} from "./dto/add-role.dto";
import {ChangeUserInfoDto} from "./dto/change-user-info.dto";

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({summary: 'создание пользователя'})
  @ApiResponse({ status: 200, type: User})
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto)
  }

  @ApiOperation({summary: 'получение пользователей - только для Админа'})
  @ApiResponse({ status: 200, type: [User]})
  @Roles("ADMIN", "OWNER")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers()
  }

  @ApiOperation({summary: 'добавление роли - только для Админа'})
  @ApiResponse({ status: 200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.userService.addRole(addRoleDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  update(@Body() changeUserDto: ChangeUserInfoDto) {
    return this.userService.changeUser(changeUserDto)
  }

}
