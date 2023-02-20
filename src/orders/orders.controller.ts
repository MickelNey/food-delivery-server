import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {CreateOrderDto} from "./dto/create-order.dto";
import {ChangeStatusDto} from "./dto/change-status.dto";
import {getProfitDto} from "./dto/get-profit.dto";

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

  @Get('/user/:id')
  getByUserId(@Param('id') id: number) {
    return this.orderService.getOrdersByUserId(id)
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.orderService.getOrderById(id)
  }

  @Post('/status')
  changeStatus(@Body() changeStatusDto: ChangeStatusDto) {
    return this.orderService.changeOrderStatus(changeStatusDto)
  }

  @Post('/profit')
  getProfit(@Body() getProfitDto: getProfitDto) {
    return this.orderService.getProfit(getProfitDto)
  }


  @Post('/top')
  getTop(@Body() getProfitDto: getProfitDto) {
    return this.orderService.getTopProducts(getProfitDto)
  }
}
