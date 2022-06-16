import { FactoryProvider } from '@nestjs/common';
import { UserRepository } from './user-repository';
import { UserRepositoryFactory } from './user-repository-factory';
import { USER_REPOSITORY } from '../../constants';

export const repositoryProviders: FactoryProvider<Promise<UserRepository>> = {
  provide: USER_REPOSITORY,
  useFactory: async (factory: UserRepositoryFactory) =>
    factory.createRepository(),
  inject: [UserRepositoryFactory],
};
