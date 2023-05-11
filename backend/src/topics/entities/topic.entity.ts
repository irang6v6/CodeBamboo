import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Leaf } from 'src/leafs/entities/leaf.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  topic_id: number;

  @Column({ type: 'boolean', default: true })
  needHelp: boolean;

  @CreateDateColumn()
  creation_time: Timestamp;

  @ManyToOne(() => User, (user) => user.topics, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Leaf, (leaf) => leaf.topic)
  leafs: Leaf[];

  @OneToOne(() => Leaf, (leaf) => leaf.bestLeaf)
  @JoinColumn({ name: 'best_leaf_id' })
  bestLeaf: Leaf;

  @OneToOne(() => Leaf, (leaf) => leaf.rootLeaf)
  @JoinColumn({ name: 'root_leaf_id' })
  rootLeaf: Leaf;
}
