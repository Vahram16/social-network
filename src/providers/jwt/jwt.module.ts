import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtService } from './jwt.provider';

@Module({
  imports: [Jwt.register({secret:'as'})],
  providers:[JwtService],
  exports: [JwtService],
})
export class JwtModule {}
