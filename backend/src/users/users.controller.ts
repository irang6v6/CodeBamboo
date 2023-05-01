import { Query, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SimpleUserDto } from './dto/simple.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateFollowDto } from './dto/create.follow.dto';
import { GetUserDto } from './dto/get.user.dto';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    ) {}

  // [#] 테스트용 코드
  @Get()
  getAll(): Promise<SimpleUserDto[]> {
    return this.usersService.getAll();
  }

  // [1] 유저 nickname으로 정보 조회
  @Get('search')
  searchUsersNickname(
    @Query('nickname') searchNickname: string,
  ): Promise<SimpleUserDto[]> {
    return this.usersService.searchUsersNickname(searchNickname);
  }

  // [2] 유저Id로 팔로우 목록 조회
  @Get('following/:id')
  getFollowUsers(@Param('id') id: number): Promise<GetUserDto[]> {
    return this.usersService.getFollowUsers(id);
  }

  // [3] 팔로우 생성 및 삭제
  @Post('follow')
  followUser(@Body() createFollowDto: CreateFollowDto) {
    return this.usersService.followUser(createFollowDto);
  }

  // [4] 유저 id로 정보 조회
  @Get(':id')
  getUser(@Param('id') id: number): Promise<GetUserDto> {
    return this.usersService.getUser(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.deleteOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
