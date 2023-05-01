import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  provider: string;

  @IsOptional()
  @IsString()
  introduce: string | null;

  @IsNotEmpty()
  @IsString()
  access_token: string
}
