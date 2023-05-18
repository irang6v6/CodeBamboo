import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  OneToMany,
} from 'typeorm';
import { Follow } from './follow.entity';
import { Bookmark } from './bookmark.entity';
import { LikeEntity } from './like.entity';
import { Topic } from 'src/topics/entities/topic.entity';
import { Leaf } from 'src/leafs/entities/leaf.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ nullable: true })
  email: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  provider: string;

  @Column()
  oauth_id: string;

  @CreateDateColumn()
  creation_time: Timestamp;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  introduce: string;

  @OneToMany(() => Follow, (follow) => follow.following)
  followings: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followed)
  followeds: Follow[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];

  @OneToMany(() => Topic, (topic) => topic.user)
  topics: Topic[];

  @OneToMany(() => Leaf, (leaf) => leaf.user)
  leafs: Leaf[];
}
