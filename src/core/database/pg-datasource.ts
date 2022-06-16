import { DataSource } from 'typeorm';
import { appConfig } from '../config';

export const PgDataSource = new DataSource(appConfig.pg);

export default PgDataSource.initialize()
  .then((dataSource) => {
    console.log('PG initializes successfully');
    return dataSource;
  })
  .catch((e) => {
    throw e;
  });
