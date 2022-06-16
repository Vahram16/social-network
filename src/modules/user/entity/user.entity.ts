import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { FriendRequestEntity } from '../../friendship/entities/friend-request.entity';

@Entity('user')
@Index('USER_PROP_COMB', ['firstName', 'lastName', 'age'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int' })
  age: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // relations
  @OneToMany(() => FriendRequestEntity, (fr) => fr.receiver)
  receiverUser: FriendRequestEntity[];

  @OneToMany(() => FriendRequestEntity, (fr) => fr.requester)
  requesterUser: FriendRequestEntity[];
}
