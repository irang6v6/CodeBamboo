import { Timestamp } from 'typeorm';
import {
  IsBoolean,
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateTopicDto {
  @IsNotEmpty()
  @IsBoolean()
  needHelp: boolean;

  @IsNotEmpty()
  user: User;
}
