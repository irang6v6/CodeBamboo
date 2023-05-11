import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { NaverService } from './naver/naver.service';
import { KakaoService } from './kakao/kakao.service';
import { GithubService } from './github/github.service';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [
    AuthService,
    NaverService,
    KakaoService,
    GithubService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
