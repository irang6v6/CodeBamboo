import { Controller, Body, Param, Post, Res, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

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
  ) {
    try {
      // 1. provider 유효성 검사
      const providers = ['kakao', 'naver', 'github'];
      if (!providers.includes(provider)) {
        throw new HttpException('Bad request.', HttpStatus.BAD_REQUEST);
      }
      // 2. provider로부터 유저 정보 받아오기
      const userInfoFromProvider = await this.AuthService.getSocialUserInfo(provider, code);
      console.log('로직 2 :', userInfoFromProvider)
      // 3. (신규유저일 경우)회원가입 시키고, 토큰 생성 후 반환
      const userInfo = await this.AuthService.socialLogin({...userInfoFromProvider, provider});
      console.log('로직 3 :', userInfo)
      // 4-1. 리프레시 토큰은 httpOnly로 쿠키에 넣어줌
      res.cookie('refresh_token', userInfo.refresh_token, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
      });
      // 4-2. 리프레시 토큰 뺸 나머지 정보들 프론트에 반환
      return res.status(HttpStatus.OK).json({
          message : "로그인 성공",
          data : {
            ...userInfo.user
          }
        });
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
