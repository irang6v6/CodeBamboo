import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Leaf } from 'src/leafs/entities/leaf.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
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
}
