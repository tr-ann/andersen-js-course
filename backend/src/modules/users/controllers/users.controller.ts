import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { CreateUserDto, UserDto } from '../dto';
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
  async readByLogin(@Param('login') login: string) {
    return await this.usersService.readByLogin(login);
  }

  @Put(':login')
  async update(@Param('login') login: string, @Body() updateUserDto: UserDto) {
    return await this.usersService.update(login, updateUserDto);
  }

  @Delete(':login')
  @HttpCode(204)
  async delete(@Param('login') login: string) {
    return await this.usersService.delete(login);
  }
}
