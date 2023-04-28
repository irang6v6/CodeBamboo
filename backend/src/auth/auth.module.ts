// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.strategy';

@Module({
  imports: [
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60m' },
    // }),
  ],
  providers: [AuthService], // Add AuthService as a provider
  exports: [AuthService], // Export AuthService for other modules to use
})
export class AuthModule {}
