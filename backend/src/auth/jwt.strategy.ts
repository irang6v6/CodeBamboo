import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

// 우리가 auth.guard.ts에서 선언한 jwtAuthGuard가 pasport라이브러리의 AuthGuard('jwt')를 상속했고,
// PassportStrategy(Strategy)를 상속받은 jwtStrategy가 요청을 넘겨받아 jwt 검증하는 로직을 수행한다.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRET,
    } as StrategyOptions);
  }

  // Validate함수는 PassportStrategy에서 미리정의되어있는 함수이다.
  // 토큰에서 페이로드를 추출한 뒤에, validate함수가 자동으로 실행된다.
  async validate(payload: any) {
    
    // 1. 토큰 페이로드의 유효성 검사
    if (!payload || !payload.user_id || !payload.nickname) {
      throw new UnauthorizedException({ errorType: 'invalid_payload', message: '유효하지 않은 토큰입니다.' });
    }
  
    // 2. 토큰 만료 검사
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp <= currentTime) {
      throw new UnauthorizedException({ errorType: 'expired_token', message: '만료된 토큰입니다.' });
    }
    
    return payload;
  }
}
