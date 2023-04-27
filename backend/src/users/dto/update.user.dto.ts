import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.user.dto';

// UpdateUserDto는 CreateMovieDto와 인터페이스 동일하나 필수 값이 아니다
export class UpdateUserDto extends PartialType(CreateUserDto) {}
