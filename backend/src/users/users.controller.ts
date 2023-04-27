import { Query, Body, Controller, Delete, Get, Param, Patch, Post, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/oauth/:owner")
  oauth(@Param('owner') owner:string, @Body('code') code:string){
    const owners = ['kakao', 'naver', 'github']
    if (!owners.includes(owner)) {
      throw new HttpException('잘못된 요청입니다.', HttpStatus.BAD_REQUEST);
    }

    return this.usersService.oauth(owner, code)
  }
  
  @Get(":id")
  getOne(@Param('id') id:string): User {
    return this.usersService.getOne(id)
  }
  
  @Get()
  getAll() :User[] {
    return this.usersService.getAll()
  }
  

  @Delete(":id")
  delete(@Param('id') id:string){
    return this.usersService.deleteOne(id)
  }

  @Patch(':id')
  update(@Param('id') id:string, @Body() updateProfile){
    return {
      id,
      ...updateProfile
    }
  }
}
