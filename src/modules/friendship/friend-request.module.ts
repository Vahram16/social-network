import { Module } from '@nestjs/common';
import { FriendRequestController } from './controller/friend-request.controller';
import { UserModule } from '../user/user.module';
import { CommonModules } from '../../core/commen/commen.module';
import { FriendRequestService } from './service/friend-request.service';
import { FriendRequestRepositoryFactory } from './repository/friend-request-repository-factory';
import { friendRequestRepositoryProvider } from './repository/friend-request-repository.provider';

@Module({
  imports: [UserModule, ...CommonModules],
  controllers: [FriendRequestController],
  providers: [
    FriendRequestService,
    friendRequestRepositoryProvider,
    FriendRequestRepositoryFactory,
  ],
})
export class FriendRequestModule {}
