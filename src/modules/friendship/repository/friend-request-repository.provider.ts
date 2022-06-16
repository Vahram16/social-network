import { FactoryProvider } from '@nestjs/common';
import { FriendRequestRepository } from './friend-request-repository';
import { FriendRequestRepositoryFactory } from './friend-request-repository-factory';
import { FRIEND_REQUEST_REPOSITORY } from '../constants';

export const friendRequestRepositoryProvider: FactoryProvider<
  Promise<FriendRequestRepository>
> = {
  provide: FRIEND_REQUEST_REPOSITORY,
  useFactory: async (factory: FriendRequestRepositoryFactory) =>
    factory.createRepository(),
  inject: [FriendRequestRepositoryFactory],
};
