import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RolesService} from "./roles.service";
import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({summary: 'создание роли'})
  @ApiResponse({ status: 200, type: Role})
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.roleService.createRole(roleDto)
  }

  @Get()
  getAll() {
    return this.roleService.getRoles()
  }

  @ApiOperation({summary: 'получение роли'})
  @ApiResponse({ status: 200, type: Role})
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value)
  }
}
