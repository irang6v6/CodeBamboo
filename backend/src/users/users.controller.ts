import {
  Query,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SimpleUserDto } from './dto/simple.user.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { memoryStorage } from 'multer';
import { Public } from 'src/auth/utils/public.decorator';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // [#] 테스트용 코드
  @Get()
  getAll(): Promise<SimpleUserDto[]> {
    return this.usersService.getAll();
  }

  // [1] 유저 nickname으로 정보 조회 ok
  @Get('search')
  searchUsersNickname(@Query('nickname') userInput: string) {
    return this.usersService.searchUsersNickname(userInput);
  }

  // [2] 유저 팔로우 목록 조회 ok
  @Get('following/:id')
  getFollowUsers(@Param('id') userId: number) {
    return this.usersService.getFollowUsers(userId);
  }

  // [3] 팔로우 생성 및 삭제 ok
  @UseGuards(JwtAuthGuard)
  @Post('follow')
  followUser(@Req() req: Request, @Body() reqBody: any) {
    return this.usersService.followUser(req.user['user_id'], reqBody.userId);
  }

  // [4] 유저 토픽 조회 ok
  @Get('topic/:id')
  getUserTopics(@Param('id') userId: number) {
    return this.usersService.getUserTopics(userId);
  }

  // [5] 유저 리프 조회 ok
  @Get('leaf/:id')
  getUserLeafs(@Param('id') userId: number) {
    return this.usersService.getUserLeafs(userId);
  }

  // [6] 특정 유저가 즐겨찾기한 리프 조회 ok
  @Get('bookmark')
  getBookmarkLeafs(@Query('id') userId: number) {
    return this.usersService.getBookmarkLeafs(userId);
  }

  // [7] 즐겨찾기 추가 및 제거 ok
  @UseGuards(JwtAuthGuard)
  @Post('bookmark/:id')
  addBookmarkLeaf(@Req() req: Request, @Param('id') leafId: number) {
    const myUserId = req.user['user_id'];
    return this.usersService.addBookmarkLeaf(myUserId, leafId);
  }

  // [8] 리프 좋아요 추가 및 삭제 ok
  @UseGuards(JwtAuthGuard)
  @Post('like/:id')
  addLikeLeaf(@Param('id') leafId: number, @Req() req: Request) {
    return this.usersService.addLikeLeaf(req.user['user_id'], leafId);
  }

  // [9] 유저 id로 정보 조회 ok
  @UseGuards(JwtAuthGuard)
  @Public()
  @Get(':id')
  getUser(@Req() req: Request, @Param('id') id: number) {
    const myUserId = req.user ? req.user['user_id'] : 0;
    return this.usersService.getUser(myUserId, id);
  }

  // [10] 유저 정보 수정
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('profileImg', {
      storage: memoryStorage(),
      limits: { fileSize: 2097152 }, // 2MB --- 2*2^20
      fileFilter: (req, file, callback) => {
        return file.mimetype.match(/image\/(jpg|jpeg|png|gif)$/)
          ? callback(null, true)
          : callback(new BadRequestException('Only image files are allowed'), false);
      }
    })
  )
  @Patch()
  update(@Req() req: Request, @Body() userInput: any, @UploadedFile() profileImg) {
    // console.log('img : ', profileImg)
    return this.usersService.update(req.user['user_id'], userInput, profileImg);
  }
}
