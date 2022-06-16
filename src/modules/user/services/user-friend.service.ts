import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/userRepository/user-repository';
import { USER_REPOSITORY } from '../constants';
import { UserEntity } from '../entity/user.entity';
import { mergeIdsRequesterWithReceiver } from './util';

@Injectable()
export class UserFriendService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository,
  ) {}

  async list(id: string): Promise<UserEntity[]> {
    const userWithFriendRequests: Partial<UserEntity> =
      await this.userRepository.findFriendListById(id);
    if (!userWithFriendRequests) throw new NotFoundException('User not found');
    const friendsIds: string[] = mergeIdsRequesterWithReceiver(
      userWithFriendRequests,
    );
    if (!friendsIds.length) return [];
    return this.userRepository.customFindByIds(friendsIds);
  }

  async requestList(id: string): Promise<Partial<UserEntity>> {
    return this.userRepository.findFriendRequestsById(id);

    // if (!users?.invitedUser?.length) return [];
    // const friendsIds: string[] = users.invitedUser.map((a) => a.requestedId);
    // const friends: UserEntity[] = await this.userRepository.customFindByIds(
    //   friendsIds,
    // );
    // return {data: users.invitedUser}
    // return friends.map((f) => {
    //   const friendshipId: string = friendsIds.find((a) => f.id === a);
    //   return { user: f, friendshipId };
    // });
  }
}
