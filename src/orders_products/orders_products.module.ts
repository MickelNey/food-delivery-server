import { Module } from '@nestjs/common';
import { OrdersProductsService } from './orders_products.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "../products/products.model";
import {Order} from "../orders/orders.model";
import {OrdersProducts} from "./orders_products.model";

@Module({
  providers: [OrdersProductsService],
  imports: [
    SequelizeModule.forFeature([Product, Order, OrdersProducts])
  ],
  exports: [
    OrdersProductsService
  ]
})
export class OrdersProductsModule {}
