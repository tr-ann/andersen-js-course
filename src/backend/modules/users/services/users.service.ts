import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UserDto } from '../dto';
import { User } from '../schemas';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ login: userData.login }).exec();
    if (existingUser) {
      throw new BadRequestException('Such login already exists');
    }
    const createdUser = await this.userModel.create(userData);

    return createdUser;
  }

  async readAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async readById(login: string): Promise<User> {
    const user = await this.userModel.findOne({ login }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(login: string, userData: UserDto): Promise<User> {
    const user = await this.userModel.findOne({ login }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await user.update(userData);

    return user;
  }

  async delete(login: string): Promise<void> {
    const user = await this.userModel.findOne({ login }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userModel.deleteOne(user);

    return;
  }
}
