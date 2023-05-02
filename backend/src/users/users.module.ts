import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userRepository } from './dao/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { followRepository } from './dao/follows.repository';
import { bookmarkRepository } from './dao/bookmarks.repository';
import { likeRepository } from './dao/likes.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...userRepository,
    ...followRepository,
    ...bookmarkRepository,
    ...likeRepository,
    UsersService,
  ],
  exports: [...userRepository],
})
export class UsersModule {}
