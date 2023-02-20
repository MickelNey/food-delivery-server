import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: AuthUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email)

    if (candidate) {
      throw new HttpException('User with that email exist', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({ ...userDto, password: hashPassword})
    return this.generateToken(user)
  }

  async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,
      secondName: user.secondName,
      roles: user.roles,
      orders: user.orders
    }

    return {
      ...payload,
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: AuthUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email)
    if (!user) {
      throw new UnauthorizedException({message: 'некорректный email'})
    }
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
    if (passwordEquals) {
      return user
    }
    throw new UnauthorizedException({message: 'некорректиный email или пароль'})
  }

  async decodeToken(token: string) {
    return this.jwtService.decode(token)
  }

  async updateUser(user: User) {
    const payload = await this.userService.changeUser(user)
    return await this.generateToken(payload)
  }
}
