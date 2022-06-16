import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FriendRequestEntity } from '../entities/friend-request.entity';
import { UserService } from '../../user/services/user.service';
import { FRIEND_REQUEST_REPOSITORY } from '../constants';
import { SendFriendRequestResponseDto } from '../dto/send-friend-request.dto';
import { UserEntity } from '../../user/entity/user.entity';
import { FriendRequestRepository } from '../repository/friend-request-repository';
import { FriendshipStatus } from '../type/status';
import { AcceptFriendRequestResponseDto } from '../dto/accept-friend-request.dto';

@Injectable()
export class FriendRequestService {
  constructor(
    @Inject(FRIEND_REQUEST_REPOSITORY)
    private friendRequestRepository: FriendRequestRepository,
    private userService: UserService,
  ) {}

  // In friend request table can be only saved a->b and b->a users.
  // This way we avoid row duplications and can easily manage friendship state.
  // In real project it will be better solution to keep status separate from friend request.
  async create(
    receiverId: string,
    requesterId: string,
  ): Promise<SendFriendRequestResponseDto> {
    const receiverUser: UserEntity = await this.userService.getUserInternalById(
      receiverId,
    );
    if (!receiverUser) throw new NotFoundException('User not found');
    if (requesterId === receiverId) throw new ConflictException();

    // Try to get friendship
    const existingFriendRequest: FriendRequestEntity[] =
      await this.tryGetExistingFriendRequest(receiverId, requesterId);
    if (existingFriendRequest?.length) {
      const [friendRequest] = existingFriendRequest.filter((r) => {
        if (r.status === FriendshipStatus.Pending) {
          throw new ConflictException(
            'The friend request has already been sent',
          );
        }
        if (r.status === FriendshipStatus.Accepted) {
          throw new ConflictException('You are already friends');
        }
        return r.requesterId === requesterId;
      });
      if (friendRequest) {
        await this.friendRequestRepository.update(
          { id: friendRequest.id },
          { status: FriendshipStatus.Pending },
        );
        return { success: true };
      }
    }
    await this.friendRequestRepository.customCreate({
      requesterId,
      receiverId,
    });
    return { success: true };
  }

  async accept(
    friendRequestId: string,
    receivedId: string,
  ): Promise<AcceptFriendRequestResponseDto> {
    const friendRequest: FriendRequestEntity =
      await this.friendRequestRepository.findOneBy({
        id: friendRequestId,
        receiverId: receivedId,
      });
    if (!friendRequest) {
      throw new NotFoundException('Not found');
    }

    if (friendRequest.status === FriendshipStatus.Accepted) {
      throw new ConflictException('You are already friends ');
    }

    await this.friendRequestRepository.update(
      { id: friendRequest.id },
      { status: FriendshipStatus.Accepted },
    );
    return { success: true };
  }

  async reject(friendRequestId: string, userId: string) {
    const friendRequest: FriendRequestEntity =
      await this.friendRequestRepository.findOneBy({
        id: friendRequestId,
      });
    if (!friendRequest) {
      throw new NotFoundException('Not found');
    }
    const isReceiver: boolean = friendRequest.receiverId === userId;
    const isRequester: boolean = friendRequest.requesterId === userId;

    if (!isReceiver && !isRequester) {
      throw new UnauthorizedException();
    }

    if (friendRequest.status === FriendshipStatus.Rejected) {
      throw new ConflictException('Status is rejected');
    }

    await this.friendRequestRepository.update(
      { id: friendRequest.id },
      { status: FriendshipStatus.Rejected },
    );

    return { success: true };
  }

  private async tryGetExistingFriendRequest(
    receiverId: string,
    requesterId: string,
  ): Promise<FriendRequestEntity[]> {
    return this.friendRequestRepository.find({
      where: [
        { requesterId, receiverId },
        { requesterId: receiverId, receiverId: requesterId },
      ],
    });
  }
}
