import { Timestamp } from 'typeorm';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Leaf } from 'src/leafs/entities/leaf.entity';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  bookmark_id: number;

  @CreateDateColumn()
  creation_time: Timestamp;

  @Column({ nullable: true, default: 'memo' })
  memo: string;

  @ManyToOne(() => User, (user) => user.bookmarks, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Leaf, (leaf) => leaf.bookmarks, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'leaf_id' })
  leaf: Leaf;
}
