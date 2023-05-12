import { IsNotEmpty, IsString } from 'class-validator';

export class MessageUserDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
