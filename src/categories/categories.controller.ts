import {Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {CategoriesService} from "./categories.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('categories')
export class CategoriesController {

  constructor(private categoryService: CategoriesService) {}

  @Get()
  getAll() {
    return this.categoryService.getAllCategories()
  }
  
  @Roles("SELLER")
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() categoryDto: CreateCategoryDto,
         @UploadedFile() image) {
    return this.categoryService.createCategory(categoryDto, image)
  }

  @Get('/:title')
  getByValue(@Param('title') title: string) {
    return this.categoryService.getCategoryByTitle(title)
  }
}
