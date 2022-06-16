import { Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from '../../entity/user.entity';
import { filterUserInputData } from '../../services/util';
import { CustomFindByParam } from './type';
import { FriendshipStatus } from '../../../friendship/type/status';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  getByEmail(email: string): Promise<UserEntity> {
    return this.findOneBy({ email });
  }

  customFindByIds(ids: string[]): Promise<UserEntity[]> {
    return this.createQueryBuilder('user').whereInIds(ids).getMany();
  }

  customFindBy(data: CustomFindByParam): Promise<UserEntity[]> {
    const queryBuilder: SelectQueryBuilder<UserEntity> =
      this.createQueryBuilder('user');
    const query: ObjectLiteral = filterUserInputData(data);
    queryBuilder.where(query);
    return queryBuilder.getMany();
  }

  findFriendListById(id: string): Promise<UserEntity> {
    const queryBuilder: SelectQueryBuilder<UserEntity> =
      this.createQueryBuilder('user');
    queryBuilder.where({ id });
    queryBuilder.leftJoinAndSelect(
      'user.receiverUser',
      'rec',
      'rec.status =:status',
      {
        status: FriendshipStatus.Accepted,
      },
    );
    queryBuilder.leftJoinAndSelect(
      'user.requesterUser',
      'req',
      'req.status =:status',
      {
        status: FriendshipStatus.Accepted,
      },
    );
    return queryBuilder.getOne();
  }

  findFriendRequestsById(id: string): Promise<UserEntity> {
    const queryBuilder: SelectQueryBuilder<UserEntity> =
      this.createQueryBuilder('user');
    queryBuilder.where({ id });
    queryBuilder.innerJoinAndSelect('user.receiverUser', 'rec');
    queryBuilder.innerJoinAndSelect('rec.requester', 'req');
    queryBuilder.select(['user', 'rec.id', 'req']);
    queryBuilder.andWhere('rec.status = :status', {
      status: FriendshipStatus.Pending,
    });

    return queryBuilder.getOne();
  }
}
