import { config } from 'dotenv';
import { join } from 'path';
import { AppConfig } from '../type/config';

config();

export type EnvType = 'test' | 'development';
export const nodeEnv: EnvType =
  (process.env.NODE_ENV as EnvType) ?? 'development';
const defaults: AppConfig = {
  pg: {
    url:
      process.env.PG_URL ||
      'postgresql://postgres:postgres_password@localhost:5432/social-network',
    entities: [join(__dirname + '/../../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '../../../migrations/*{.ts,.js}')],
    type: 'postgres',
    logging: true,
  },
  jwt: {
    accessToken: {
      secret: process.env.JWT_SECRET || 'secret',
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN || '30d',
      algorithm: 'HS384',
    },
  },

  salt: Number(process.env.SALT) || 10,
};

const development = {
  ...defaults,
};

const test = {};

const configs: Record<EnvType, any> = {
  test,
  development,
};

export const appConfig: AppConfig = configs[nodeEnv];

export default () => appConfig as AppConfig;
