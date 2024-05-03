import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Plant } from './schemas/plant.schema';

import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

@Injectable()
export class PlantsService {
  constructor(@InjectModel(Plant.name) private readonly plantModel: Model<Plant>) {}

  public async findAll(): Promise<Plant[]> {
    return await this.plantModel.find();
  }

  public async findAllActive(): Promise<Plant[]> {
    return await this.plantModel.find({ isActive: true });
  }

  public async findOneByQuery(query: UpdatePlantDto): Promise<Plant | null> {
    return await this.plantModel.findOne(query).select('-isActive');
  }

  public async findOneById(id: string): Promise<Plant> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const plant = await this.plantModel.findById(id);

    if (!plant) {
      throw new NotFoundException(`Plant with ID "${id}" was not found`);
    }

    return plant;
  }

  public async create(dto: CreatePlantDto): Promise<Plant> {
    const createdPlant = await new this.plantModel(dto).save();
    const plant = await this.findOneById(createdPlant._id);
    return plant;
  }

  public async update(id: string, dto: UpdatePlantDto): Promise<Plant | null> {
    await this.findOneById(id);

    const updatedPlant = await this.plantModel.findByIdAndUpdate(id, dto, {
      new: true
    });

    return updatedPlant;
  }

  public async remove(id: string): Promise<Plant> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const plant = await this.plantModel.findByIdAndDelete(id);

    if (!plant) {
      throw new NotFoundException(`Plant with ID ${id} was not found`);
    }

    return plant;
  }
}
