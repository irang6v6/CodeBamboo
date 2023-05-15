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
import { Code } from '../entities/code.entity';

export class UpdateLeafDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  codes: Code;
}
