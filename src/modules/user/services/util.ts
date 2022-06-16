import { ObjectLiteral } from 'typeorm';
import { FilterInputDataParam } from '../repositories/userRepository/type';
import { UserEntity } from '../entity/user.entity';
import { FriendshipStatus } from '../../friendship/type/status';
import { FriendRequestEntity } from '../../friendship/entities/friend-request.entity';

export function filterUserInputData(data: FilterInputDataParam): ObjectLiteral {
  const { id, lastName, firstName, age } = data || {};
  return {
    ...(id ? { id } : {}),
    ...(lastName ? { lastName } : {}),
    ...(firstName ? { firstName } : {}),
    ...(age ? { age } : {}),
  };
}

export function mergeIdsRequesterWithReceiver(
  data: Partial<UserEntity>,
): string[] {
  const ids: string[] = [];
  data.requesterUser?.forEach((r) => ids.push(r.receiverId));
  data.receiverUser?.forEach((r) => ids.push(r.requesterId));
  return ids;
}
