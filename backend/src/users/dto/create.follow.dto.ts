import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateFollowDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  followUserId: number;
}
