import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "../products/products.model";
import {Order} from "./orders.model";
import {OrdersProducts} from "../orders_products/orders_products.model";
import {ProductsModule} from "../products/products.module";
import {User} from "../users/users.model";
import {OrdersProductsModule} from "../orders_products/orders_products.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    SequelizeModule.forFeature([Product, Order, OrdersProducts, User]),
    ProductsModule,
    OrdersProductsModule,
    AuthModule
  ],
  exports: [
    OrdersService
  ]
})
export class OrdersModule {}
