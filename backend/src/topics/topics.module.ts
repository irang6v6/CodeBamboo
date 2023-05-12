import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TopicRepository } from './dao/topics.repository';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { LeafRepository } from 'src/leafs/dao/leafs.repository';
import { CodeRepository } from 'src/leafs/dao/codes.repository';
import { userRepository } from 'src/users/dao/users.repository';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TopicsController],
  providers: [
    ...TopicRepository,
    ...LeafRepository,
    ...CodeRepository,
    ...userRepository,
    TopicsService,
  ],
})
export class TopicsModule {}
