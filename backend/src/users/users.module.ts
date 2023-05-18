import { Module, ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userRepository } from './dao/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { followRepository } from './dao/follows.repository';
import { bookmarkRepository } from './dao/bookmarks.repository';
import { likeRepository } from './dao/likes.repository';
import { LeafRepository } from 'src/leafs/dao/leafs.repository';
import { APP_PIPE } from '@nestjs/core';
import { TopicRepository } from 'src/topics/dao/topics.repository';
import { CloudStorageService } from '../core/services/cloud-stroage-service'
import { GptService } from 'src/core/services/gpt.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...userRepository,
    ...followRepository,
    ...bookmarkRepository,
    ...likeRepository,
    ...LeafRepository,
    ...TopicRepository,
    UsersService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    CloudStorageService,
    GptService
  ],
  exports: [...userRepository, UsersService],
})
export class UsersModule {}
