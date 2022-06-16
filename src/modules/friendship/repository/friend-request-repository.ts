import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FriendRequestEntity } from '../entities/friend-request.entity';

@Injectable()
export class FriendRequestRepository extends Repository<FriendRequestEntity> {
  async customCreate(data: Partial<FriendRequestEntity>) {
    return this.createQueryBuilder()
      .insert()
      .into(FriendRequestEntity)
      .values({
        receiverId: data.receiverId,
        requesterId: data.requesterId,
      })
      .execute();
  }
}
