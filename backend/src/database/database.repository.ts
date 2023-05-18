import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Topic } from 'src/topics/entities/topic.entity';
import { Leaf } from 'src/leafs/entities/leaf.entity';
import { Code } from 'src/leafs/entities/code.entity';
import { Follow } from 'src/users/entities/follow.entity';
import { Bookmark } from 'src/users/entities/bookmark.entity';
import { LikeEntity } from 'src/users/entities/like.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.MYSQL_URL,
        port: parseInt(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [User, Topic, Leaf, Code, Follow, Bookmark, LikeEntity],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
