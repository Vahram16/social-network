import { DataSourceOptions } from 'typeorm';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';

export type AppConfig = {
  pg?: DataSourceOptions;
  jwt?: { accessToken?: JwtSignOptions; refreshToken?: JwtSignOptions };
  salt?: number;
};
