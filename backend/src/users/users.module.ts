import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userRepository, UsersService],
  exports: [...userRepository]
})
export class UsersModule {}
