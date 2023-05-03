import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Leaf } from './leaf.entity';

@Entity()
export class Code {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  code_id: number;

  @Column({ length: 100 })
  language: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @ManyToOne(() => Leaf, (leaf) => leaf.codes, { eager: true })
  @JoinColumn({ name: 'leaf_id' })
  leaf: Leaf;
}
