import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    } as StrategyOptions);

    console.log('Secret:', process.env.SECRET)
  }

  async validate(payload: any) {
    console.log('Payload:', payload)
    console.log('Token expiration:', payload.exp);
    if (!payload || !payload.user_id) {
      throw new UnauthorizedException({ errorType: 'invalid_payload', message: '토큰 페이로드가 유효하지 않습니다.' });
    }

    return { user_id: payload.user_id };
  }

  handleResult(err, user, info) {
    if (err || !user) {
      const message = info && info.message ? info.message : 'Unauthorized';
      const errorType = info && info.name === 'TokenExpiredError' ? 'expired_token' : 'unauthorized';
      throw new UnauthorizedException({ errorType, message });
    }
    return user;
  }
}
