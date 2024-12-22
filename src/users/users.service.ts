import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>) {
  }
  async create(createUserDto: CreateUserDto) {
    const User = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(User);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const User = await this.findOne(id);
    if (!User) {
      throw new NotFoundException();
    }

    Object.assign(User, updateUserDto);

    return await this.usersRepository.save(User);
  }

  async remove(id: number) {
    const User = await this.findOne(id);
    if (!User) {
      throw new NotFoundException();
    }

    return await this.usersRepository.remove(User);
  }




  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
}