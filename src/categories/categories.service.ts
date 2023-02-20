import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {Category} from "./categories.model";

@Injectable()
export class CategoriesService {

  constructor(@InjectModel(Category) private categoryRepository: typeof Category,
              private fileService: FilesService) {}

  async createCategory(dto: CreateCategoryDto, image: any) {
    const fileName = await this.fileService.createFile(image, 'svg')

    return await this.categoryRepository.create({...dto, imageUrl: fileName})
  }

  async getAllCategories() {
    return await this.categoryRepository.findAll()
  }

  async getCategoryByTitle(title: string) {
    return await this.categoryRepository.findOne({where: {title}})
  }


}
