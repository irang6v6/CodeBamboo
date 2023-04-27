import { Injectable, , Inject, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository, Like } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { SimpleUserDto } from './dto/simple.user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // async isNewbie(OAuthID: number): Promise<SimpleUserDto> {
   async isNewbie(OAuthID: number): Promise<Boolean> {
    const user = await this.userRepository.findOne({ where: { oauth_id: OAuthID } });
    if (!user) {
      // throw new NotFoundException(`user id ${OAuthID} not found`);
      return false
    }
    return true;
  }

  async create(createUserdto: CreateUserDto): Promise<void> {
    await this.userRepository.save(createUserdto);
  }

  async login(user: CreateUserDto): Promise<{ access_token: string, refresh_token: string }> {
    const payload = { sub: user.user_i d, username: user.nickname }; // Customize the payload as needed
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '30d' }); // Set the refresh token expiration time

    return {
      access_token,
      refresh_token,
    };
  }

  async signUp(userInfo: any): Promise<CreateUserDto> {
    // Save user data to the database and return the saved user
    const newUser = this.userRepository.create(userInfo);
    await this.userRepository.save(newUser);
    return newUser;
  }

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
