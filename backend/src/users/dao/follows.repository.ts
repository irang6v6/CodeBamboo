import { Follow } from '../entities/follow.entity';
import { DataSource } from 'typeorm';

export const followRepository = [
  {
    provide: 'FOLLOW_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Follow),
    inject: ['DATA_SOURCE'],
  },
];
