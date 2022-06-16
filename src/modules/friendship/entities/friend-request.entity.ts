import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { FriendshipStatus } from '../type/status';

@Entity('friend_request')
@Unique(['receiver', 'requester'])
export class FriendRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  receiverId: string;

  @Column()
  requesterId: string;

  @Column({ enum: FriendshipStatus, default: FriendshipStatus.Pending })
  status: FriendshipStatus;

  /// RELATIONS....
  @ManyToOne(() => UserEntity, (user) => user.receiverUser)
  receiver: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.requesterUser)
  requester: UserEntity;
}
