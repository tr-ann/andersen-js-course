import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async readAll() {
    return await this.usersService.readAll();
  }

  @Get(':login')
  async readById(@Param('login') login: string) {
    return await this.usersService.readById(login);
  }

  @Put(':login')
  async update(@Param('login') login: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(login, updateUserDto);
  }

  @Delete(':login')
  @HttpCode(204)
  async delete(@Param('login') login: string) {
    return await this.usersService.delete(login);
  }
}
