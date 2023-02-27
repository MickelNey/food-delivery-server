import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "./products.model";
import {Order} from "../orders/orders.model";
import {OrdersProducts} from "../orders_products/orders_products.model";
import {FilesModule} from "../files/files.module";
import {ProductsCategories} from "../categories/products-categories.model";
import {Category} from "../categories/categories.model";
import {CategoriesModule} from "../categories/categories.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    SequelizeModule.forFeature([Product, Order, Category, OrdersProducts, ProductsCategories]),
    FilesModule,
    CategoriesModule,
    AuthModule
  ],
  exports: [
    ProductsService
  ]
})
export class ProductsModule {}
