import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import {Order} from "./orders/orders.model";
import { ProductsModule } from './products/products.module';
import {Product} from "./products/products.model";
import {OrdersProducts} from "./orders_products/orders_products.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { CategoriesModule } from './categories/categories.module';
import { OrdersProductsModule } from './orders_products/orders_products.module';
import * as path from 'path'
import {Category} from "./categories/categories.model";
import {ProductsCategories} from "./categories/products-categories.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, Order, Product, Category, OrdersProducts, UserRoles, ProductsCategories],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    OrdersModule,
    ProductsModule,
    FilesModule,
    CategoriesModule,
    OrdersProductsModule,
  ]
})
export class AppModule {}
