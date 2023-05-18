import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  follow_id: number;

  @ManyToOne(() => User, (user) => user.followings, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'following' })
  following: User;

  @ManyToOne(() => User, (user) => user.followeds, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'followed' })
  followed: User;
}
