import { Query, Body, Controller, Delete, Get, Param, Patch, Post, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { SimpleUserDto } from './dto/simple.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly JwtService: JwtService,
    ) {}

    @Post('/oauth/:provider')
    async oauth(
      @Param('provider') provider: string,
      @Body('code') code: string,
      @Res() res: Response,
    ): Promise<Response> {
      try {
        // 1. provider 유효성 검사
        const providers = ['kakao', 'naver', 'github'];
        if (!providers.includes(provider)) {
          throw new HttpException('Bad request.', HttpStatus.BAD_REQUEST);
        }
        // 2. provider로부터 유저 정보 받아오기
        const userInfoFromProvider = await this.usersService.getSocialUserInfo(provider, code);
        // 3. (신규유저일 경우)회원가입 시키고, 토큰 생성 후 반환
        const userInfo = await this.usersService.signUpAndLogin(userInfoFromProvider);
        // 4. 프론트에 유저 정보 반환하기
        return res.status(HttpStatus.OK).json(userInfo);
      } catch (error) {
        console.log(error)
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
  @Get()
  getAll(): Promise<SimpleUserDto[]> {
    return this.usersService.getAll();
  }

  @Get('search')
  search(@Query('name') userInput: string): Promise<SimpleUserDto[]> {
    return this.usersService.search(userInput);
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<SimpleUserDto> {
    return this.usersService.getOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.usersService.deleteOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    this.usersService.update(id, updateUserDto);
  }
}
