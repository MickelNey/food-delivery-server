import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Category} from "./categories.model";
import {Product} from "../products/products.model";
import {ProductsCategories} from "./products-categories.model";
import {FilesModule} from "../files/files.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [
    SequelizeModule.forFeature([Category, Product, ProductsCategories]),
    FilesModule,
    AuthModule
  ],
  exports: [
    CategoriesService
  ]
})
export class CategoriesModule {}
