import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { User } from '../schemas/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(userData);
    await createdUser.save();

    return createdUser;
  }

  async readAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async readById(login: string): Promise<User> {
    return await this.userModel.findOne({ login }).exec();
  }

  async update(login: string, userData: UpdateUserDto) {
    const user = await this.userModel.findOne({ login }).exec();

    return await user.update(userData);
  }

  async delete(login: string) {
    const user = await this.userModel.findOne({ login }).exec();
    await this.userModel.deleteOne(user);

    return;
  }
}
