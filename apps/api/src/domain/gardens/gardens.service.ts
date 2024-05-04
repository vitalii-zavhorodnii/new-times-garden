import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { DateTime } from 'luxon';

import { Garden } from './schemas/garden.schema';
import type { Plant } from '@domain/plants/schemas/plant.schema';

import { UpdateGardenDto } from './dto/update-garden.dto';

import { DEFAULT_GARDEN } from 'constants/garden.constants';

@Injectable()
export class GardensService {
  constructor(
    @InjectModel(Garden.name) private readonly gardenModel: Model<Garden>
  ) {}

  public async create(): Promise<Garden> {
    const newGarden = await new this.gardenModel({
      isActive: true,
      field: DEFAULT_GARDEN
    }).save();

    const garden = await this.findOneById(newGarden._id);

    return garden;
  }

  public async update(id: string, dto: UpdateGardenDto): Promise<Garden> {
    const garden = this.gardenModel.findById(id);

    if (!garden) {
      return null;
    }

    const updatedGarden = await this.gardenModel.findByIdAndUpdate(id, dto, {
      new: true
    });

    return updatedGarden;
  }

  public async updatePlant(
    id: string,
    rowIndex: number,
    plantIndex: number,
    clientTime: number,
    plant: Plant
  ) {
    const time = DateTime.now().toMillis();
    // Creating cell with plantedTime and plant Plant ref
    const value = {
      plant: plant,
      plantedAtClient: clientTime,
      plantedAt: time
    };

    const key = `field.${rowIndex}.${plantIndex}`;
    const newGarden = await this.gardenModel.findByIdAndUpdate(
      id,
      {
        $set: { [key]: value }
      },
      {
        new: true
      }
    );

    return newGarden;
  }

  public async removePlant(id: string, rowIndex: number, plantIndex: number) {
    const key = `field.${rowIndex}.${plantIndex}`;
    const newGarden = await this.gardenModel.findByIdAndUpdate(
      id,
      {
        $set: { [key]: null }
      },
      {
        new: true
      }
    );

    return newGarden;
  }

  public async findOneById(id: string): Promise<Garden> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }
    const garden = await this.gardenModel.findById(id);

    if (!garden) {
      throw new NotFoundException(`Garden with ID "${id}" was not found`);
    }

    return garden;
  }
}
