import { Bookmark } from '../entities/bookmark.entity';
import { DataSource } from 'typeorm';

export const bookmarkRepository = [
  {
    provide: 'BOOKMARK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Bookmark),
    inject: ['DATA_SOURCE'],
  },
];
