import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Garden } from './schemas/garden.schema';

import { UpdateGardenDto } from './dto/update-garden.dto';

import { DEFAULT_GARDEN } from 'constants/garden.constants';

@Injectable()
export class GardensService {
  constructor(
    @InjectModel(Garden.name) private readonly gardenModel: Model<Garden>
  ) {}

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

  // public async create(dto: CreateIssueDto): Promise<Issue> {
  //   const foundIssue = await this.issueModel.findOne({
  //     slug: dto.slug
  //   });

  //   if (foundIssue) {
  //     throw new BadRequestException(`Issue with slug "${dto.slug}" already exists`);
  //   }

  //   const createdIssue = await new this.issueModel(dto).save();
  //   const issue = await this.findOneById(createdIssue._id);
  //   return issue;
  // }

  public async update(id: string, dto: UpdateGardenDto): Promise<Garden> {
    const garden = this.gardenModel.findById(id);

    const updatedGarden = await this.gardenModel
      .findByIdAndUpdate(id, dto, {
        new: true
      })
      .populate('image')
      .populate({ path: 'benefits', populate: { path: 'icon' } });

    return updatedGarden;
  }

  public async create(): Promise<Garden> {
    const newGarden = await new this.gardenModel(DEFAULT_GARDEN).save();

    const garden = await this.findOneById(newGarden._id);
    
    return garden;
  }
}
