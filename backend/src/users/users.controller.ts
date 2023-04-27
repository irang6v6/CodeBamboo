import { Query, Body, Controller, Delete, Get, Param, Patch, Post, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { SimpleUserDto } from './dto/simple.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

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
