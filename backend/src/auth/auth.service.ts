import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: { user_id: number; nickname: string; provider: string }): string {
    const payload = {
      sub: user.user_id,
      nickname: user.nickname,
      provider: user.provider,
    };

    return this.jwtService.sign(payload);
  }
}
