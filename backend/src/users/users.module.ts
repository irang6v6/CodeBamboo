import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userRepository } from './users.repository';
import { UsersController } from './users.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from './users.service';
import { KakaoService } from 'src/auth/kakao/kakao.service';
import { NaverService } from 'src/auth/naver/naver.service';
import { GithubService } from 'src/auth/github/github.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [DatabaseModule,
    JwtModule.register({
      global:true,
      secret: "secret",
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [UsersController],
  providers: [...userRepository, UsersService, JwtService, KakaoService, NaverService, GithubService],
})
export class UsersModule {}
