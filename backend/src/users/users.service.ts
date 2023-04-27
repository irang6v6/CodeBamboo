import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository, Like } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { SimpleUserDto } from './dto/simple.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<SimpleUserDto[]> {
    return this.userRepository.find();
  }

  async search(userInput: string): Promise<SimpleUserDto[]> {
    const users = await this.userRepository.find({
      where: { nickname: Like(`%${userInput}%`) },
    });
    if (!users) {
      throw new NotFoundException(`user nickname ${userInput} not found`);
    }
    return users;
  }

  async getOne(id: number): Promise<SimpleUserDto> {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (!user) {
      throw new NotFoundException(`user id ${id} not found`);
    }
    return user;
  }

  async create(createUserdto: CreateUserDto): Promise<void> {
    await this.userRepository.save(createUserdto);
  }

  async deleteOne(id: number): Promise<void> {
    const simpleUserDto = await this.getOne(id);
    if (simpleUserDto) {
      await this.userRepository.delete(id);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const simpleUserDto = await this.getOne(id);
    if (simpleUserDto) {
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          nickname: updateUserDto.nickname,
          image: updateUserDto.image,
          introduce: updateUserDto.introduce,
        })
        .where('user_id = :id', { id })
        .execute();
    }
  }
}
