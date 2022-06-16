import { Module } from '@nestjs/common';
import { pgDataSourceProvider } from './pg.provider';

@Module({
  imports: [],
  providers: [pgDataSourceProvider],
  exports: [pgDataSourceProvider],
})
export class DatabaseModule {}
