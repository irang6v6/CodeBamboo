import { Controller, Body, Param, Post, Res, HttpStatus, UseGuards, BadRequestException, InternalServerErrorException, Req, Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './auth.guard';
import { LoginResponseDto } from './dto/login.response.dto';
import { providerValidator } from './utils/utils';

@Controller('auth')
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
        secure: false,
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

  // 토큰 검증
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout (@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    console.log('user_id : ', user["user_id"])

    res.clearCookie('refresh_token');
    return res.status(HttpStatus.OK).json({ message: '로그아웃 성공' });
  }

  // 토큰 검증 X
  @Get('access')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    try {
      // 쿠키의 리프레시 토큰을 할당
      const refreshToken = req.cookies['refresh_token']
      if (!refreshToken) throw new UnauthorizedException('Invalid refresh token');

      const newAccessToken = await this.AuthService.refreshAccessToken(refreshToken);
      // @res 데코레이터를 사용했다면, 리턴문 역시 이런 형태로 작성해야 정상적으로 리스폰스를 반환할 수 있다.
      return res.status(HttpStatus.OK).json({ 
        message : '엑세스 토큰 재발급 성공',
        data: newAccessToken 
      })
      
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        // 1. 쿠키의 리프레시 토큰 삭제
        res.clearCookie('refresh_token');
        return res.status(HttpStatus.OK).json({ message: '리프레쉬 토큰이 유효하지 않습니다. 로그아웃됩니다.' });
      } else {
        // 500에러일 때는, 원래대로 500에러 send
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }
}
