import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Achievement } from './schemas/achievement.schema';

import { CreateAchievementDto } from './dto/create-achievement.dto';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectModel(Achievement.name)
    private readonly paymentModel: Model<Achievement>
  ) {}

  public async create(dto: CreateAchievementDto): Promise<Achievement> {
    const achievement = await new this.paymentModel(dto).save();

    return achievement;
  }

  public async findActive(): Promise<Achievement[]> {
    const achievements = await this.paymentModel.find({ isActive: true });

    return achievements;
  }

  public async findById(id: string): Promise<Achievement> {
    const achievement = await this.paymentModel.findById(id);

    return achievement;
  }
}
