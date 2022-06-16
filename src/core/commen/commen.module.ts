import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

export const CommonModules: (
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference<any>
)[] = [DatabaseModule];
