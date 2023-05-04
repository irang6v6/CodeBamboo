import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// AuthGuard가 authorization 헤더의 토큰의 유효성을 검사해줍니다.
// 컨트롤러 로직에 @useGuard 데코레이터를 통해 적용시킬 수 있습니다.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
