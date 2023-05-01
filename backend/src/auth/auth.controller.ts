import { Controller, Body, Param, Post, Res, HttpStatus, UseGuards, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { LoginResponseDto } from './dto/login.response.dto';

@Controller('auth')
// @UseGuards(AuthGuard)
export class AuthController {
  constructor(
    private AuthService : AuthService
  ){}

  @Post('oauth/:provider')
  async login (
    @Param('provider') provider: string,
    @Body('code') code: string,
    @Res() res: Response
  )
   {
    try {
      // 1. provider 유효성 검사
      const providers = ['kakao', 'naver', 'github'];
      if (!providers.includes(provider)) {
        throw new BadRequestException();
      }
      // 2. provider로부터 유저 정보 받아오기
      const userInfoFromProvider = await this.AuthService.getSocialUserInfo(provider, code);
      // 3. (신규유저일 경우)회원가입 시키고, 토큰 생성 후 반환
      const userInfo = await this.AuthService.socialLogin({...userInfoFromProvider, provider});
      // 4-1. 리프레시 토큰은 httpOnly로 쿠키에 넣어줌
      res.cookie('refresh_token', userInfo.refresh_token, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
      });
      // 4-2. 리프레시 토큰 뺸 나머지 정보들 프론트에 반환
      const response : LoginResponseDto = {
        message: "로그인 성공",
        data: {
          ...userInfo.user,
        },
      }; 
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException();
    }
  }
}
