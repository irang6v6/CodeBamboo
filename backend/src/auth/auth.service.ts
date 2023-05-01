import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { KakaoService } from './kakao/kakao.service';
import { NaverService } from './naver/naver.service';
import { GithubService } from './github/github.service';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { SocialUserInfoDto } from './dto/social.userInfo.dto';
import { SimpleUserDto } from 'src/users/dto/simple.user.dto';
import { SocialLoginResponseDto } from './dto/social.userInfo.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private KakaoService : KakaoService,
    private NaverService : NaverService,
    private GithubService : GithubService,
    ) {}
  
  async signUp({nickname, image, oauth_id, provider, email} : SocialUserInfoDto): Promise<SimpleUserDto> {
    oauth_id = oauth_id.toString()
    const user = this.userRepository.create({nickname, image, oauth_id, provider, email});
    await this.userRepository.save(user);
    return user
  }   

  async getSocialUserInfo(provider:string, code:string) : Promise<SocialUserInfoDto>{
    let userInfo; let nickname; let image; let oauth_id; let email;
    switch (provider) {
      case 'kakao' :
        userInfo = await this.KakaoService.oauthKaKao(provider, code)
        nickname = userInfo.properties.nickname;
        image = userInfo.properties.profile_image;
        oauth_id = userInfo.id; 
        email = userInfo.email || `${nickname}@codeBamboo.site`
        break
      case 'naver' :
        userInfo = await this.NaverService.oauthNaver(provider, code)
        nickname = userInfo.response.nickname
        image = userInfo.response.profile_image
        oauth_id = userInfo.response.id
        email = userInfo.response.email || `${nickname}@codeBamboo.site`
        break
      case 'github' :
        userInfo = await this.GithubService.oauthGithub(provider, code)
        nickname = userInfo.login
        image = userInfo.avatar_url
        oauth_id = userInfo.id
        email  = userInfo.html_url || `${nickname}@codeBamboo.site`
        break
      default :
        throw new BadRequestException()
    }

    return {nickname, image, oauth_id: oauth_id.toString(), email}
  }
  
  async socialLogin(userInfoFromProvider: SocialUserInfoDto): Promise<SocialLoginResponseDto> {
    const {nickname, image, oauth_id, provider, email} = userInfoFromProvider
    // [1]. 기존유저인지 확인
    let user = await this.userRepository.findOne({ where: { oauth_id: oauth_id, isDeleted: false } });
    // [2]. 신규 유저이면 회원가입.
    if (!user) {
      user = await this.signUp({nickname, image, oauth_id, provider, email})
      console.log('신규유저 회원가입완료. user_id :', user.user_id)
    } 
    console.log('기존유저입니다. user_id :', user.user_id)
    // [3]. 토큰 생성
    const payload = { user_id: user.user_id, nickname: user.nickname }
    const access_token = this.jwtService.sign(payload)
    const refresh_token = this.jwtService.sign(payload, {expiresIn:'14d'})

    return {
      refresh_token,
      user : {
        access_token,
        nickname: user.nickname,
        image: user.image,
        provider,
        email: user.email || `${user.nickname}@codeBamboo.site`,
        introduce: user.introduce,
        user_id : Number(user.user_id)
      }
    };
  }
}
