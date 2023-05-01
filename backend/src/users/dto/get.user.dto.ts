import {
  IsNumber,
  IsOptional,
  IsString,
  IsEmail,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  introduce: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;

  // @IsNotEmpty()
  // @IsBoolean()
  // isFollowed: boolean;
}
