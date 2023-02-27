import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {CreateOrderDto} from "./dto/create-order.dto";
import {ChangeStatusDto} from "./dto/change-status.dto";
import {getProfitDto} from "./dto/get-profit.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  create(@Body() orderDto: CreateOrderDto) {
    return this.orderService.createOrder(orderDto)
  }

  @Get()
  getAll() {
    return this.orderService.getAllOrders()
  }

  @Roles("USER")
  @UseGuards(RolesGuard)
  @Get('/user/:id')
  getByUserId(@Param('id') id: number) {
    return this.orderService.getOrdersByUserId(id)
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.orderService.getOrderById(id)
  }

  @Roles("SELLER")
  @UseGuards(RolesGuard)
  @Post('/status')
  changeStatus(@Body() changeStatusDto: ChangeStatusDto) {
    return this.orderService.changeOrderStatus(changeStatusDto)
  }


  @Roles("OWNER")
  @UseGuards(RolesGuard)
  @Post('/profit')
  getProfit(@Body() getProfitDto: getProfitDto) {
    return this.orderService.getProfit(getProfitDto)
  }

  @Roles("OWNER")
  @UseGuards(RolesGuard)
  @Post('/top')
  getTop(@Body() getProfitDto: getProfitDto) {
    return this.orderService.getTopProducts(getProfitDto)
  }
}
