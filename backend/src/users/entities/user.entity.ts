import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  OneToMany,
} from 'typeorm';
import { Follow } from './follow.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
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
}
