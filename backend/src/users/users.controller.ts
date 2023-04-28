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
    private JwtService: JwtService,
    ) {}

    @Post('/oauth/:owner')
    async oauth(
      @Param('owner') owner: string,
      @Body('code') code: string,
      @Res() res: Response,
    ): Promise<Response> {
      try {
        const owners = ['kakao', 'naver', 'github'];
        if (!owners.includes(owner)) {
          throw new HttpException('Bad request.', HttpStatus.BAD_REQUEST);
        }
    
        const { nickname, image, oauth_id, provider } = await this.usersService.getSocialUserInfo(owner, code);
        console.log('로직 1', {nickname, image, oauth_id, provider})

        const user_id = await this.usersService.signUp({ nickname, image, oauth_id, provider });
        console.log('로직 2', user_id)
        
        const access_token = this.JwtService.sign({ nickname, sub : user_id, provider: owner });
        const refresh_token = this.JwtService.sign({ nickname, sub : user_id, provider: owner }, { expiresIn: '30d' });
        console.log(access_token, refresh_token)
        
        return res.status(HttpStatus.OK).json({ nickname, image, oauth_id, user_id, access_token, refresh_token });
      } catch (error) {
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
