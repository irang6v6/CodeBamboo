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

  @IsNotEmpty()
  @IsString()
  username: string;

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
  @IsNumber()
  oauth_id: number;

  @IsNotEmpty()
  @IsDate()
  creation_time: Timestamp;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;

  @IsOptional()
  @IsString()
  introduce: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
