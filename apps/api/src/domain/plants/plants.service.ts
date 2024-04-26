import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Plant } from './schemas/plant.schema';

import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

@Injectable()
export class PlantsService {
  constructor(
    @InjectModel(Plant.name) private readonly plantsService: Model<Plant>
  ) {}

  public async findAll(): Promise<Plant[]> {
    return await this.plantsService
      .find()
      .populate({ path: 'image' })
      .populate({ path: 'benefits', populate: { path: 'icon' } });
  }

  public async findAllActive(): Promise<Plant[]> {
    return await this.plantsService
      .find({ isActive: true })
      .populate({ path: 'image' })
      .populate({ path: 'benefits', populate: { path: 'icon' } });
  }

  public async findOneByQuery(query: UpdatePlantDto): Promise<Plant | null> {
    return await this.plantsService
      .findOne(query)
      .select('-isActive')
      .populate({ path: 'image' })
      .populate({ path: 'benefits', populate: { path: 'icon' } });
  }

  public async findOneById(id: string): Promise<Plant> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const plant = await this.plantsService
      .findById(id)
      .populate('image')
      .populate({ path: 'benefits', populate: { path: 'icon' } });

    if (!plant) {
      throw new NotFoundException(`Plant with ID "${id}" was not found`);
    }

    return plant;
  }

  public async create(dto: CreatePlantDto): Promise<Plant> {
    const foundPlant = await this.plantsService.findOne({
      slug: dto.slug
    });

    if (foundPlant) {
      throw new BadRequestException(`Plant with slug "${dto.slug}" already exists`);
    }

    const createdPlant = await new this.plantsService(dto).save();
    const plant = await this.findOneById(createdPlant._id);
    return plant;
  }

  public async update(id: string, dto: UpdatePlantDto): Promise<Plant | null> {
    await this.findOneById(id);

    const updatedPlant = await this.plantsService
      .findByIdAndUpdate(id, dto, {
        new: true
      })
      .populate('image')
      .populate({ path: 'benefits', populate: { path: 'icon' } });
    return updatedPlant;
  }

  public async remove(id: string): Promise<Plant> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const plant = await this.plantsService.findByIdAndDelete(id);

    if (!plant) {
      throw new NotFoundException(`Plant with ID ${id} was not found`);
    }

    return plant;
  }
}