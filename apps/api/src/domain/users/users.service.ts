import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import { Achievement } from '@domain/achievements/schemas/achievement.schema';
import { Garden } from '@domain/gardens/schemas/garden.schema';

import { CreateUserDto } from './dto/create-user.dto';

import { INIT_CURRENCY } from '@constants/users.constants';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  public async create(dto: CreateUserDto, garden: Garden): Promise<User> {
    const newUser = await new this.userModel({
      ...dto,
      balanceCoins: INIT_CURRENCY.coins,
      balanceTokens: INIT_CURRENCY.tokens,
      garden: garden._id
    }).save();

    const user = await this.userModel.findById(newUser._id).populate('garden');

    return user;
  }

  public async findOneByTelegramId(telegramId: string): Promise<User | null> {
    const user = await this.userModel
      .findOne({ telegramId })
      .populate('garden')
      .populate('achievements.todo.achievement')
      .populate('achievements.completed.achievement')
      .populate('quests.todo.quest')
      .populate('quests.completed.quest')
      .exec();

    if (!user) {
      return null;
    }

    return user;
  }

  public async updateUserTokens(userId: string, amount: number): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        balanceTokens: amount
      },
      { new: true }
    );

    return user;
  }

  public async updateUserCoins(userId: string, amount: number): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        balanceCoins: amount
      },
      { new: true }
    );

    return user;
  }

  public async updateUserXp(userId: string, amount: number): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        xp: amount
      },
      { new: true }
    );

    return user;
  }

  public async startGrow(userId: string, plantId: string): Promise<User> {
    const user = await this.userModel.findById(userId);

    return user;
  }

  public async completeAchievement(userId: string, usrAchId: string) {
    const user = await this.userModel.findByIdAndUpdate(
      userId
      // {$push: {'acviements.completed': }}
    );

    return user;
  }

  public async todoAchievement(userId: string, achieveId: string) {
    const achieve = {
      achievement: achieveId,
      goal: 300,
      progress: 0
    };

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: { 'achievements.todo': achieve }
      },
      { new: true }
    );

    return user;
  }
}
