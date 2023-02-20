import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {User} from "../users/users.model";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:token')
  getProfile(@Param('token') token: string) {
    return this.authService.decodeToken(token)
  }

  @Post('/update')
  updateUser(@Body() user: User) {
    return this.authService.updateUser(user)
  }
}
