import { Topic } from '../entities/topic.entity';
import { DataSource } from 'typeorm';

export const TopicRepository = [
  {
    provide: 'TOPIC_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Topic),
    inject: ['DATA_SOURCE'],
  },
];
