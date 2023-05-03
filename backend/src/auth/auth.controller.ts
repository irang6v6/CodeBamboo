import { Controller, Body, Param, Post, Res, HttpStatus, UseGuards, BadRequestException, InternalServerErrorException, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { LoginResponseDto } from './dto/login.response.dto';
import { providerValidator } from './utils/utils';

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
      if (!providerValidator(provider)) {
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
        access_token: userInfo.access_token,
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

  @Post('logout')
  async logout (@Req() req: Request, @Res() res: Response) {
    res.clearCookie('refresh_token');
    return res.status(HttpStatus.OK).json({ message: '로그아웃 성공' });
  }
}
