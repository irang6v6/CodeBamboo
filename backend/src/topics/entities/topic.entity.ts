import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  topic_id: number;

  @Column({ type: 'boolean', default: true })
  need_help: boolean;

  @CreateDateColumn()
  creation_time: Timestamp;

  @ManyToOne(() => User, (user) => user.topic)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
