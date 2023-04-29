import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken({user_id, nickname}, expiresIn:string = '10m' ): string {
    const payload = {
      user_id, nickname
    };

    return this.jwtService.sign(payload, {expiresIn, secret:jwtConstants.secret});
  }
}
