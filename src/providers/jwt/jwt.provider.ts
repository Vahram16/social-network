import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SessionJwtPayload } from '../../core/type/session';
import { JwtService as JwtServiceNest } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(
    private jwtService: JwtServiceNest,
    private config: ConfigService,
  ) {}

  createAccessToken(data: SessionJwtPayload): Promise<string> {
    console.log("FROM--1", this.config.get('jwt.accessToken.secret'))
    return this.jwtService.signAsync(data, {
      secret: this.config.get('jwt.accessToken.secret'),
      algorithm: this.config.get('jwt.accessToken.algorithm'),
      expiresIn: this.config.get('jwt.accessToken.expiresIn'),
    });
  }

  verifyAccessToken(token: string): Promise<SessionJwtPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: this.config.get('jwt.accessToken.secret'),
      algorithms: [this.config.get('jwt.accessToken.algorithm')],
    });
  }
}
