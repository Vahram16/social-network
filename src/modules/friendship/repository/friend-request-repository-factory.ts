import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { FriendRequestRepository } from './friend-request-repository';
import { FriendRequestEntity } from '../entities/friend-request.entity';
import { PG_DATA_SOURCE } from '../../../core/constants';
import { RepositoryFactory } from '../../../core/repositoryFactory/repository-factory';

@Injectable()
export class FriendRequestRepositoryFactory extends RepositoryFactory {
  constructor(@Inject(PG_DATA_SOURCE) private dataSource: DataSource) {
    super();
  }

  createRepository(): FriendRequestRepository {
    return new FriendRequestRepository(
      FriendRequestEntity,
      this.dataSource.manager,
    );
  }
}
