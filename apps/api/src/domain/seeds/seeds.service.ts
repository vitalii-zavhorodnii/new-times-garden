import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Seed } from './schemas/seed.schema';

import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';

@Injectable()
export class SeedsService {
  constructor(@InjectModel(Seed.name) private readonly SeedModel: Model<Seed>) {}

  public async findAll(): Promise<Seed[]> {
    return await this.SeedModel
      .find()
      .populate({ path: 'image' })
      .populate({ path: 'benefits', populate: { path: 'icon' } });
  }

  public async findAllActive(): Promise<Seed[]> {
    return await this.SeedModel
      .find({ isActive: true })
      .populate({ path: 'image' })
      .populate({ path: 'benefits', populate: { path: 'icon' } });
  }

  public async findOneByQuery(query: UpdateSeedDto): Promise<Seed | null> {
    return await this.SeedModel
      .findOne(query)
      .select('-isActive')
      .populate({ path: 'image' })
      .populate({ path: 'benefits', populate: { path: 'icon' } });
  }

  public async findOneById(id: string): Promise<Seed> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const Seed = await this.SeedModel
      .findById(id)
      .populate('image')
      .populate({ path: 'benefits', populate: { path: 'icon' } });

    if (!Seed) {
      throw new NotFoundException(`Seed with ID "${id}" was not found`);
    }

    return Seed;
  }

  public async create(dto: CreateSeedDto): Promise<Seed> {
    const foundSeed = await this.SeedModel.findOne({
      slug: dto.slug
    });

    if (foundSeed) {
      throw new BadRequestException(`Seed with slug "${dto.slug}" already exists`);
    }

    const createdSeed = await new this.SeedModel(dto).save();
    const Seed = await this.findOneById(createdSeed._id);
    return Seed;
  }

  public async update(id: string, dto: UpdateSeedDto): Promise<Seed | null> {
    await this.findOneById(id);

    const updatedSeed = await this.SeedModel
      .findByIdAndUpdate(id, dto, {
        new: true
      })
      .populate('image')
      .populate({ path: 'benefits', populate: { path: 'icon' } });
    return updatedSeed;
  }

  public async remove(id: string): Promise<Seed> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const contact = await this.SeedModel.findByIdAndDelete(id);

    if (!contact) {
      throw new NotFoundException(`Seed with ID ${id} was not found`);
    }

    return contact;
  }
}
