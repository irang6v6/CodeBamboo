import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './utils/public.decorator';
import { JwtService } from '@nestjs/jwt';

// 1. JwtAuthGuard가 클라이언트의 요청을 가로챕니다.
// 2. JwtStrategy는 토큰을 처리하고 검증합니다.
// 3. JwtAuthGuard의 handleRequest 메서드는 JwtStrategy의 결과를 처리합니다.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      // console.log('RequestHeader:', authHeader);
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
          const payload = this.jwtService.verify(token, { secret: process.env.SECRET });
          // console.log('payload:', payload);
          request.user = payload;
        } catch (error) {
          // console.log('Error verifying token:', error);
        }
      }
      return true;
    }
    return super.canActivate(context);
  }

  // 이렇게 handleRequest라는 함수를 호출해서,
  // JwtStrategy에서 최종적으로 반환된 user와 error를 처리할 수도 있습니다.
  // handleRequest(err, user, info) {
  //   // some Logics...
  //   return user;
  // }
}
