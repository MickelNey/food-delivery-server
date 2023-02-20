import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "./products.model";
import {CreateProductDto} from "./dto/create-product.dto";
import {FilesService} from "../files/files.service";
import {CategoriesService} from "../categories/categories.service";
import {Category} from "../categories/categories.model";
import {ChangeProductDto} from "./dto/change-product.dto";

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product) private productRepository: typeof Product,
              private fileService: FilesService,
              private categoryService: CategoriesService) {}

  async createProduct(dto: CreateProductDto, image: any) {
    const fileName = await this.fileService.createFile(image, 'jpg')
    const product = await this.productRepository.create({...dto, imageUrl: fileName})

    const category = await this.categoryService.getCategoryByTitle(dto.category)

    await product.$set('categories', [category])
    product.categories = [category]
    return product
  }

  async getAllProducts() {
    return await this.productRepository.findAll({include: Category})
  }

  async getProductsInStock() {
    const products = await this.productRepository.findAll()
    return products.filter(product => product.quantity > 0)
  }

  async getProductById(id: number) {
    return await this.productRepository.findOne({where: {id}})
  }

  async changeProductFields(dto: ChangeProductDto) {
    try {
      const product = await this.productRepository.findByPk(dto.id, { include: Category })
      product.cost = dto.cost
      product.quantity = dto.quantity
      await product.save()
      return product
    }
    catch (e) {
      throw new UnauthorizedException({message: 'Продукт не найден'})
    }
  }


  async changeProductProfit() {

  }

  async deleteProduct(id: number) {
    await this.productRepository.destroy({ where: {id}})
    return await this.getAllProducts()
  }

  async getSortedByProfit() {

  }

}
