import { ConfigModule } from '@nestjs/config';
import appConfig from './core/config';
import { DatabaseModule } from './core/database/database.module';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { FriendRequestModule } from './modules/friendship/friend-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    JwtModule,
    FriendRequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
