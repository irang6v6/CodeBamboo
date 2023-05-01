import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SocialUserInfoDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  oauth_id: string;
  
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  provider?: string;
}


export class SocialLoginResponseDto {
  refresh_token: string;
  user: {
    access_token: string;
    nickname: string;
    image: string;
    provider: string;
    email: string;
    introduce: string | null;
    user_id: number;
  };
}