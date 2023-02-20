import { Injectable } from '@nestjs/common';
import {CreateProductOrderDto} from "./dto/create-productOrder.dto";
import {InjectModel} from "@nestjs/sequelize";
import {OrdersProducts} from "./orders_products.model";

@Injectable()
export class OrdersProductsService {

  constructor(
    @InjectModel(OrdersProducts) private orderProductsRepository: typeof OrdersProducts
  ) {}

  async createProductOrder(dto: CreateProductOrderDto) {
    return await this.orderProductsRepository.create(dto)
  }

}
