import { CreateDateColumn, Timestamp } from 'typeorm';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Topic } from 'src/topics/entities/topic.entity';

export class CreateLeafDto {
  @IsNotEmpty()
  @IsBoolean()
  is_root: boolean;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @CreateDateColumn()
  creation_time: Timestamp;

  @IsNotEmpty()
  @IsNumber()
  export: number;

  @IsNotEmpty()
  @IsNumber()
  step: number;

  @IsNotEmpty()
  @IsNumber()
  ref_order: number;

  @IsNotEmpty()
  @IsNumber()
  parent_leaf_id: number;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  topic: Topic;
}
