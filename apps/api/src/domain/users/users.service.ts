import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GardensService } from 'domain/gardens/gardens.service';

import { User } from './schemas/user.schema';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly gardendsService: GardensService
  ) {}

  public async create(dto: CreateUserDto): Promise<User> {
    console.log({ dto });
    const garden = await this.gardendsService.create();

    const newUser = await new this.userModel({ ...dto, garden: garden._id }).save();

    const user = await this.userModel.findById(newUser._id);

    return user;
  }

  public async findOneByTelegramId(telegramId: string): Promise<User> {
    console.log({ telegramId });
    const user = await this.userModel.findOne({ telegramId });

    if (!user) {
      throw new NotFoundException(`User with ID "${telegramId}" was not found`);
    }

    return user;
  }
}
