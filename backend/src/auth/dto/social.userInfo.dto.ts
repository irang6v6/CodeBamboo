import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

// 소셜로그인 provider에게 받아오는 유저인포 DTO
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

// 로그인 로직 전부 완료하고, 컨트롤러로 반환할 때의 DTO
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