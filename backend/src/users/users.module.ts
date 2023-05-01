import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userRepository } from './dao/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { followRepository } from './dao/follows.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userRepository, ...followRepository, UsersService],
  exports: [...userRepository]
})
export class UsersModule {}
