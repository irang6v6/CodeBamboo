import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userRepository } from './users.repository';
import { UsersController } from './users.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { KakaoService } from 'src/auth/kakao/kakao.service';
import { NaverService } from 'src/auth/naver/naver.service';
import { GithubService } from 'src/auth/github/github.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [DatabaseModule,
    JwtModule.register({
      secret: "SECRET",
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [UsersController],
  providers: [...userRepository, AuthService, UsersService, JwtService, KakaoService, NaverService, GithubService],
})
export class UsersModule {}
