import { UserEntity } from '../entity/user.entity';

export type RequestListResponse = Partial<UserEntity[]> & {
  id?: string;
};
