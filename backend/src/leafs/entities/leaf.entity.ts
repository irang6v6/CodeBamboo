import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Topic } from 'src/topics/entities/topic.entity';
import { Code } from './code.entity';
import { Bookmark } from 'src/users/entities/bookmark.entity';
import { LikeEntity } from 'src/users/entities/like.entity';

@Entity()
export class Leaf {
  @PrimaryGeneratedColumn()
  leaf_id: number;

  @Column({ type: 'boolean', default: false })
  is_root: boolean;

  @Column()
  type: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @CreateDateColumn()
  creation_time: Timestamp;

  @Column({ default: 0 })
  export: number;

  @Column({ default: 0, nullable: true })
  step: number;

  @Column({ default: 0, nullable: true })
  ref_order: number;

  @Column({ default: 0 })
  parent_leaf_id: number;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @ManyToOne(() => User, (user) => user.leafs, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Topic, (topic) => topic.leafs, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @OneToMany(() => Code, (code) => code.leaf)
  codes: Code[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.leaf)
  bookmarks: Bookmark[];

  @OneToOne(() => Topic)
  bestLeaf: Topic;

  @OneToOne(() => Topic)
  rootLeaf: Topic;

  @OneToMany(() => LikeEntity, (like) => like.leaf)
  likes: LikeEntity[];
}
