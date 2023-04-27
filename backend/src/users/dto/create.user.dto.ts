import {
  IsNumber,
  IsOptional,
  IsString,
  IsEmail,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  // @IsNotEmpty()
  // @IsString()
  // username: string;

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

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;

  @IsOptional()
  @IsString()
  introduce: string;
}
