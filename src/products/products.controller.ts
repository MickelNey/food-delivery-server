import {Body, Controller, Get, Param, Post, Delete, UploadedFile, UseInterceptors, UseGuards} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {ChangeProductDto} from "./dto/change-product.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('products')
export class ProductsController {

  constructor(private productService: ProductsService) {}

  @Roles("SELLER")
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() productDto: CreateProductDto,
         @UploadedFile() image) {
    return this.productService.createProduct(productDto, image)
  }

  @Get()
  getAll() {
    return this.productService.getAllProducts()
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.productService.getProductById(id)
  }

  @Get('/stock')
  getInStock(){
    return this.productService.getProductsInStock()
  }

  @Roles("SELLER")
  @UseGuards(RolesGuard)
  @Post('/update')
  updateField(@Body() changeProductDto: ChangeProductDto) {
    return this.productService.changeProductFields(changeProductDto)
  }

  @Roles("SELLER")
  @UseGuards(RolesGuard)
  @Post('/remove/:id')
  remove(@Param('id') id: number) {
    return this.productService.deleteProduct(id)
  }
}
