import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Product } from './schemas/product.schema';

import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>
  ) {}

  public async findAllActive(): Promise<Product[]> {
    return await this.productModel.find({ isActive: true });
  }

  public async create(dto: CreateProductDto): Promise<Product> {
    const product = await new this.productModel(dto).save();

    return product;
  }

  public async update(id: string, dto: CreateProductDto): Promise<Product> {
    const foundProduct = await this.productModel.findById(id);

    if (!foundProduct) {
      throw new NotFoundException(`Product with ID:${id} was not found!`);
    }

    const product = await this.productModel.findByIdAndUpdate(id, dto, {
      new: true
    });

    return product;
  }

  public async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID:${id} was not found!`);
    }

    return product;
  }
}
