import { Injectable, Inject, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository, Like } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { SimpleUserDto } from './dto/simple.user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { KakaoService } from 'src/auth/kakao/kakao.service';
import { NaverService } from 'src/auth/naver/naver.service';
import { GithubService } from 'src/auth/github/github.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private KakaoService : KakaoService,
    private NaverService : NaverService,
    private GithubService : GithubService,
  ) {}

  async getSocialUserInfo(owner, code) {
    let userInfo; let nickname; let image; let oauth_id; let provider
    switch (owner) {
      case 'kakao' :
        userInfo = await this.KakaoService.oauthKaKao(owner, code)
        nickname = userInfo.properties.nickname;
        image = userInfo.properties.profile_image;
        oauth_id = userInfo.id; 
        provider = 'kakao'
        break
      // case 'naver' :
      //   userInfo = await this.KakaoService.oauthKaKao(owner, code)
      //   break
      // case 'github' :
      //   userInfo = await this.KakaoService.oauthKaKao(owner, code)
      //   break
      default :
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }

    return {nickname, image, oauth_id, provider}
  }
  
  async signUp({nickname, image, oauth_id, provider}) {
    // [1]. 기존유저인지 확인
    const isNewbie = await this.userRepository.findOne({ where: { oauth_id: oauth_id } });
    console.log('기존 유저입니까?', isNewbie)
    if (!isNewbie) {
      const newUser = this.userRepository.create({nickname, image, oauth_id, provider});
      console.log(newUser, 62)
      await this.userRepository.save(newUser);
      console.log(newUser, 64)
      return newUser.user_id;
    } 
  
    return isNewbie.user_id
  }

  // async login(user): Promise<{ access_token: string, refresh_token: string }> {
  //   const payload = { sub: user.user_id, username: user.nickname }; // Customize the payload as needed
  //   const access_token = this.jwtService.sign(payload);
  //   const refresh_token = this.jwtService.sign(payload, { expiresIn: '30d' }); // Set the refresh token expiration time

  //   return {
  //     access_token,
  //     refresh_token,
  //   };
  // }

  async create(createUserdto: CreateUserDto): Promise<void> {
    await this.userRepository.save(createUserdto);
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
