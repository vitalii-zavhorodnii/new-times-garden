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
    const payment = await new this.paymentModel(dto).save();

    return payment;
  }
}
