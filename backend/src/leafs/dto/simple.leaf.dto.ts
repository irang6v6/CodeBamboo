import { CreateDateColumn, Timestamp } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SimpleLeafDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsBoolean()
  is_root: boolean;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @CreateDateColumn()
  creation_time: Timestamp;

  @IsNotEmpty()
  @IsNumber()
  export: number;

  @IsNotEmpty()
  @IsNumber()
  step: number;

  @IsNotEmpty()
  @IsNumber()
  ref_order: number;

  @IsNotEmpty()
  @IsNumber()
  parent_leaf_id: number;
}
