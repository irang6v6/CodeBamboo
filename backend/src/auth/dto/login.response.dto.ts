import { LoginUserDto } from "src/users/dto/login.user.dto";

export class LoginResponseDto {
  message: string;
  data: LoginUserDto;
}