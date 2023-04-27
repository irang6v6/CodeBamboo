import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  user_id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  provider: string;

  @Column()
  oauth_id: number;

  @CreateDateColumn()
  creation_time: Timestamp;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  introduce: string;

  @Column()
  refreshToken: string;
}
