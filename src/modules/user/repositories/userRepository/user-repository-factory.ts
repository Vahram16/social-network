import { RepositoryFactory } from '../../../../core/repositoryFactory/repository-factory';
import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user-repository';
import { UserEntity } from '../../entity/user.entity';
import { PG_DATA_SOURCE } from '../../../../core/constants';

@Injectable()
export class UserRepositoryFactory extends RepositoryFactory {
  constructor(@Inject(PG_DATA_SOURCE) private dataSource: DataSource) {
    super();
  }

  createRepository(): UserRepository {
    return new UserRepository(UserEntity, this.dataSource.manager);
  }
}
