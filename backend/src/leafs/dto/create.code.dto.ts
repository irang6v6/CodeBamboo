import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Leaf } from '../entities/leaf.entity';

export class CreateCodeDto {
  @IsNotEmpty()
  @IsString()
  language: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsNotEmpty()
  leaf: Leaf;
}
