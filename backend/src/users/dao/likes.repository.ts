import { LikeEntity } from '../entities/like.entity';
import { DataSource } from 'typeorm';

export const likeRepository = [
  {
    provide: 'LIKE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(LikeEntity),
    inject: ['DATA_SOURCE'],
  },
];
