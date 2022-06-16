import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import initPg from './pg-datasource';
import { PG_DATA_SOURCE } from '../constants';

export const pgDataSourceProvider: FactoryProvider<Promise<DataSource>> = {
  provide: PG_DATA_SOURCE,
  useFactory: async () => await initPg,
};
