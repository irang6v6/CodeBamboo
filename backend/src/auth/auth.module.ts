import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { NaverService } from './naver/naver.service';
import { KakaoService } from './kakao/kakao.service';
import { GithubService } from './github/github.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [ AuthService, NaverService, KakaoService, GithubService], // Add AuthService as a provider
  controllers: [AuthController], // Export AuthService for other modules to use
})
export class AuthModule {}
