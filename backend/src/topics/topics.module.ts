import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TopicRepository } from './dao/topics.repository';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { LeafRepository } from 'src/leafs/dao/leafs.repository';
import { CodeRepository } from 'src/leafs/dao/codes.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [TopicsController],
  providers: [
    ...TopicRepository,
    ...LeafRepository,
    ...CodeRepository,
    TopicsService,
  ],
})
export class TopicsModule {}
