import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtModule } from '../../providers/jwt/jwt.module';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
