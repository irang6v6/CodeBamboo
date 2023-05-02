import { Leaf } from '../entities/leaf.entity';
import { DataSource } from 'typeorm';

export const LeafRepository = [
  {
    provide: 'LEAF_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Leaf),
    inject: ['DATA_SOURCE'],
  },
];
