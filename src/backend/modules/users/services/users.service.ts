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
    return await createdUser.save();
  }

  async readAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async readById(id: number): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async update(id: number, userData: UpdateUserDto) {
    const user = await this.userModel.findById(id).exec();

    return await user.update(userData);
  }

  async delete(id: number) {
    const user = await this.userModel.findById(id).exec();
    await this.userModel.deleteOne(user);

    return;
  }
}
