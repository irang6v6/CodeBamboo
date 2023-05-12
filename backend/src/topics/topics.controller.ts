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
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create.topic.dto';
import { SimpleTopicDto } from './dto/simple.topic.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('topic')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  getAll(): Promise<SimpleTopicDto[]> {
    return this.topicsService.getAll();
  }

  @Get('mainList')
  mainList() {
    return this.topicsService.mainList();
  }

  @Get('search')
  search(@Query('input') userInput: string) {
    return this.topicsService.search(userInput);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.topicsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTopicDto, @Req() req: Request) {
    const user_id = req.user['user_id'];
    return this.topicsService.create(createTopicDto, user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('help/:id')
  closeHelp(@Param('id') id: number) {
    return this.topicsService.closeHelp(id);
  }

  //   @Patch(':id')
  //   update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
  //     this.usersService.update(id, updateUserDto);
  //   }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    this.topicsService.deleteOne(id);
  }
}
