import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

// 로그인 리스폰스의 data의 DTO
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
}


// 유저가 로그인 요청할 때 받는 리스폰스의 DTO
export class LoginResponseDto {
  message: string;
  access_token: string;
  data: LoginUserDto;
}