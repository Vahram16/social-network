import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { repositoryProviders } from './repositories/userRepository/repository.provider';
import { CommonModules } from '../../core/commen/commen.module';
import { UserRepositoryFactory } from './repositories/userRepository/user-repository-factory';
import { UserFriendService } from './services/user-friend.service';
import { UserFriendController } from './controller/user-friend.controller';

@Module({
  imports: [...CommonModules],
  controllers: [UserController, UserFriendController],
  providers: [
    UserService,
    UserFriendService,
    UserRepositoryFactory,
    repositoryProviders,
  ],
  exports: [UserService],
})
export class UserModule {}
