import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ProductsService} from "../products/products.service";
import {Order} from "./orders.model";
import {CreateOrderDto} from "./dto/create-order.dto";
import {ChangeStatusDto} from "./dto/change-status.dto";
import {OrdersProductsService} from "../orders_products/orders_products.service";
import {QueryTypes} from "sequelize";
import {getProfitDto} from "./dto/get-profit.dto";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    private productService: ProductsService,
    private orderProductService: OrdersProductsService
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const order = await this.orderRepository.create(dto)
    let products = []
    for (let i = 0; i < dto.products.length; i++) {
      const product = await this.orderProductService.createProductOrder({
        orderId: order.id,
        productId: dto.products[i].id,
        volume: dto.products[i].volume
      })
      products.push(product)
    }
    await order.$set('products', [...products.map(product => product.id)])
    order.products = [...products]
    return order
  }

  async getAllOrders() {
    const orders = await this.orderRepository.findAll({include: {all: true}})
    return await this.reorganizeData(orders)
  }

  async getOrdersByUserId(id: number) {
    const orders = await this.orderRepository.findAll({include: {all: true}, where: {userId: id}})
    return await this.reorganizeData(orders)
  }

  async getOrderById(id: number) {
    return await this.orderRepository.findOne({include: {all: true}, where: {id: id}})
  }

  async reorganizeData(orders) {
      return await Promise.all(orders.map(async order => {
        const products = await Promise.all(order.products.map(async assoc => {
          const product = await this.productService.getProductById(assoc.productId)

          return { product: {...product.dataValues} , volume: assoc.volume}
        }))

        return { ...order.dataValues, products: products }
      }))
  }

  async changeOrderStatus(dto: ChangeStatusDto) {
    const order = await this.orderRepository.findByPk(dto.orderId)
    order.status = dto.status
    await order.save()
    return order
  }

  async getProfit(dto: getProfitDto) {

    const answer: any = await this.orderRepository.sequelize.query(`
      SELECT SUM(sub.res) FROM 
        (SELECT ord.id, SUM((prod.cost - prod."costForCompany") * po.volume) as res
        FROM "orders" ord
        JOIN "products_orders" po ON po."orderId" = ord.id
        JOIN "products" prod ON prod.id = po."productId"
        WHERE ? < ord."createdAt" and ord."createdAt" < ?
        GROUP BY ord.id) as sub;
      `,
      {
        replacements: [dto.startDate, dto.endDate],
        type: QueryTypes.SELECT
      })


    return answer[0];
  }

  async getTopProducts(dto: getProfitDto) {

    const answer: any = await this.orderRepository.sequelize.query(`
      SELECT 
        pr.id,
        pr.title,
        pr."imageUrl",
        SUM((pr.cost - pr."costForCompany") * op.volume) AS "result"
        FROM "orders" ord
        JOIN "products_orders" op ON op."orderId" = ord.id
        JOIN "products" pr ON pr.id = op."productId"
        WHERE ? < ord."createdAt" and ord."createdAt" < ?

        GROUP BY 
        pr.id,
        pr.title,
        pr."imageUrl"

        ORDER BY "result" DESC
      `,
      {
        replacements: [dto.startDate, dto.endDate],
        type: QueryTypes.SELECT
      })

    return answer;
  }
}
