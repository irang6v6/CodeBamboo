import { Code } from '../entities/code.entity';
import { DataSource } from 'typeorm';

export const CodeRepository = [
  {
    provide: 'CODE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Code),
    inject: ['DATA_SOURCE'],
  },
];
