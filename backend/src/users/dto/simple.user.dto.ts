import { Timestamp } from 'typeorm';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsEmail,
  IsBoolean,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

export class SimpleUserDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  provider: string;

  @IsNotEmpty()
  @IsString()
  oauth_id: string;

  @IsOptional()
  @IsDate()
  creation_time: Timestamp;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;

  @IsOptional()
  @IsString()
  introduce: string;
}
