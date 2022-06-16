import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { appConfig } from '../../../core/config';
import { SessionJwtPayload } from '../../../core/type/session';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwt.accessToken.secret,
    });
  }

  validate(payload: SessionJwtPayload): SessionJwtPayload {
    return payload;
  }
}
