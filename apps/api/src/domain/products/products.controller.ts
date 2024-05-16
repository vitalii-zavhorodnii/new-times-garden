import { Public } from '@decorators/public.decorator';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';

import { Product } from './schemas/product.schema';

import { CreateProductDto } from './dto/create-product.dto';

import { ROUTES } from '@constants/routes.constants';

@ApiTags(ROUTES.products)
@Controller(ROUTES.products)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'public, find all active Products' })
  @ApiResponse({ status: 200, type: Product, isArray: true })
  @Public()
  @Get('')
  public async findAll(): Promise<Product[]> {
    return await this.productsService.findAllActive();
  }

  @ApiOperation({ summary: 'create new Plant' })
  @ApiResponse({ status: 200, type: Product })
  @ApiResponse({
    status: 400,
    description: 'Incorrect content data'
  })
  @Post('')
  public async createProduct(
    @Body()
    dto: CreateProductDto
  ): Promise<Product> {
    return await this.productsService.create(dto);
  }

  @ApiOperation({ summary: 'update existing Plant by ID' })
  @ApiResponse({ status: 200, type: Product })
  @ApiResponse({
    status: 404,
    description: 'Plant was not found'
  })
  @Put('/:id')
  public async updatePlant(
    @Param('id') id: string,
    @Body()
    dto: CreateProductDto
  ): Promise<Product> {
    return await this.productsService.update(id, dto);
  }
}
