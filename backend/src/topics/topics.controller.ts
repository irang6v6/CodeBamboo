import {
  Query,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create.topic.dto';
import { SimpleTopicDto } from './dto/simple.topic.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('topic')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  getAll(): Promise<SimpleTopicDto[]> {
    return this.topicsService.getAll();
  }

  //   @Get('search')
  //   search(@Query('name') userInput: string): Promise<SimpleUserDto[]> {
  //     return this.usersService.search(userInput);
  //   }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<SimpleTopicDto> {
    return this.topicsService.getOne(id);
  }

  @Post()
  create(@Body() createTopicDto) {
    this.topicsService.create(createTopicDto);
  }

  //   @Delete(':id')
  //   delete(@Param('id') id: number) {
  //     this.usersService.deleteOne(id);
  //   }

  //   @Patch(':id')
  //   update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
  //     this.usersService.update(id, updateUserDto);
  //   }
}
