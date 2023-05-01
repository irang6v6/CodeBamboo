import { Timestamp } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateTopicDto {
  @IsNotEmpty()
  @IsBoolean()
  need_help: boolean;

  @IsNotEmpty()
  user: User;
}
