import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TopicsModule } from './topics/topics.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LeafsModule } from './leafs/leafs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.main.env',
      isGlobal: true,
    }),
    UsersModule,
    TopicsModule,
    LeafsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
