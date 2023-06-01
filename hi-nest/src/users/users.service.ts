import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.userName = createUserDto.userName;
    user.userId = createUserDto.userId;
    user.password = createUserDto.password;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(userId: string): Promise<User> {
    return this.usersRepository.findOneBy({ userId: userId });
  }

  async remove(userId: string): Promise<void> {
    await this.usersRepository.delete(userId);
  }

  async update(userId: string, updateData: UpdateUserDto): Promise<void> {
    const user = this.findOne(userId);
    if (user) {
      await this.usersRepository.update(userId, updateData);
    }
  }
}
