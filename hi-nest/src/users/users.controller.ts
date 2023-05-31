import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':userName')
  findOne(@Param('userName') userName: string): Promise<User> {
    return this.usersService.findOne(userName);
  }

  @Delete(':userName')
  remove(@Param('userName') userName: string): Promise<void> {
    return this.usersService.remove(userName);
  }

  @Patch(':userName')
  update(
    @Param('userName') userName: string,
    @Body() updateData: UpdateUserDto,
  ): Promise<void> {
    return this.usersService.update(userName, updateData);
  }
}
