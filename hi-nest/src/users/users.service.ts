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
    user.password = createUserDto.password;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(userName: string): Promise<User> {
    return this.usersRepository.findOneBy({ userName: userName });
  }

  async remove(userName: string): Promise<void> {
    await this.usersRepository.delete(userName);
  }

  async update(userName: string, updateData: UpdateUserDto): Promise<void> {
    const user = this.findOne(userName);
    if (user) {
      await this.usersRepository.update(userName, updateData);
    }
  }
}
