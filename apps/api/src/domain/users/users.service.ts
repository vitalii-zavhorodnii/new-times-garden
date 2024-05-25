import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User } from './schemas/user.schema';
import { Achievement } from '@domain/achievements/schemas/achievement.schema';
import { Garden } from '@domain/gardens/schemas/garden.schema';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAchieveDto } from './dto/update-achieve.dto';
import { UpdateStatsDto } from './dto/update-stats.dto';

import { INIT_CURRENCY } from '@constants/users.constants';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  public async create(
    dto: CreateUserDto,
    garden: Garden,
    achievements: any[]
  ): Promise<User> {
    const newUser = await new this.userModel({
      ...dto,
      balanceCoins: INIT_CURRENCY.coins,
      balanceTokens: INIT_CURRENCY.tokens,
      garden: garden._id,
      achievements
    }).save();

    const user = await this.findOneByTelegramId(newUser.telegramId);

    return user;
  }

  public async findOneByTelegramId(telegramId: string): Promise<User | null> {
    const user = await this.userModel
      .findOne({ telegramId })
      .populate('garden')
      .populate('achievements.achievement')
      .populate('achievements.achievement.plant')
      .populate('quests')
      .exec();

    if (!user) {
      return null;
    }

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
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

  public async addAchievement(userId: string, achieveId: string) {
    const userAchieve = {
      achievement: achieveId
    };

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: { achievements: userAchieve }
      },
      { new: true }
    );

    return user;
  }

  public async updateUserStatistic(
    telegramId: string,
    dto: UpdateStatsDto
  ): Promise<User> {
    let user = null;
    if (dto.action === 'inc-harvests') {
      user = await this.userModel.findOneAndUpdate(
        {
          telegramId
        },
        {
          $inc: {
            'stats.harvested': 1
          }
        },
        {
          new: true
        }
      );
    }

    if (dto.action == 'claim-achieve') {
      user = await this.userModel.findOneAndUpdate(
        {
          telegramId
        },
        {
          $inc: {
            'stats.achievement': 1,
            'stats.achievePoints': 5
          }
        },
        {
          new: true
        }
      );
    }

    return user;
  }

  public async updateUserAchieve(
    telegramId: string,
    dto: UpdateAchieveDto
  ): Promise<boolean> {
    if (dto.action === 'mastery') {
      return await this.handleAchieveMastery(telegramId, dto.plantId);
    }

    return false;
  }

  public async handleAchieveMastery(
    userId: string,
    plantId: string
  ): Promise<boolean> {
    const user = await this.userModel
      .findOne({ telegramId: userId })
      .populate('achievements.achievement')
      .populate('achievements.achievement.plant');

    const achievement = user.achievements.find(
      (item) => item.achievement.plant._id.toString() === plantId.toString()
    );

    if (!achievement) return false;

    const updatedUser = await this.userModel
      .findOneAndUpdate(
        {
          telegramId: userId,
          achievements: {
            $elemMatch: {
              achievement: achievement.achievement._id
            }
          }
        },
        { $inc: { 'achievements.$.progress': 1 } },
        { new: true }
      )
      .exec();

    console.log(updatedUser.stats);

    return true;
  }
}
