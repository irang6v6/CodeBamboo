import { Injectable, Inject, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository, Like } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { SimpleUserDto } from './dto/simple.user.dto';
import { KakaoService } from 'src/auth/kakao/kakao.service';
import { NaverService } from 'src/auth/naver/naver.service';
import { GithubService } from 'src/auth/github/github.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private AuthService : AuthService,
    private KakaoService : KakaoService,
    private NaverService : NaverService,
    private GithubService : GithubService,
  ) {}

  async getSocialUserInfo(provider, code) {
    let userInfo; let nickname; let image; let oauth_id; let email;
    switch (provider) {
      case 'kakao' :
        userInfo = await this.KakaoService.oauthKaKao(provider, code)
        nickname = userInfo.properties.nickname;
        image = userInfo.properties.profile_image;
        oauth_id = userInfo.id; 
        email = userInfo.email || `${nickname}@codeBamboo.site`
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

    return {nickname, image, oauth_id, email}
  }
  
  async signUpAndLogin(userInfoFromProvider) {
    const {nickname, image, oauth_id, provider, email} = userInfoFromProvider
    // [1]. 기존유저인지 확인
    const user = await this.userRepository.findOne({ where: { oauth_id: oauth_id } });
    // [2-1]. 신규 유저일때
    if (!user) {
      const newUser = this.userRepository.create({nickname, image, oauth_id, provider, email});
      await this.userRepository.save(newUser);
      console.log('신규유저 회원가입 : ', newUser)

      const payload = {user_id:newUser.user_id, nickname:newUser.nickname}  
      const access_token = this.AuthService.generateToken(payload)
      const refresh_token = this.AuthService.generateToken(payload, '30d')

      return {access_token, refresh_token, nickname, image, provider, email, introduce:null };
    } 
    // [2-2]. 기존유저일 때
    const payload = {user_id:user.user_id, nickname:user.nickname}  
    const access_token = this.AuthService.generateToken(payload)
    const refresh_token = this.AuthService.generateToken(payload, '30d')

    return {access_token, refresh_token, nickname:user.nickname, image:user.image, provider, email:user.email, introduce:user.introduce };
  }

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
