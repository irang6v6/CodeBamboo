import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TopicRepository } from './dao/topics.repository';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TopicsController],
  providers: [...TopicRepository, TopicsService],
})
export class TopicsModule {}
