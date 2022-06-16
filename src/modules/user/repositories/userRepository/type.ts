import { FriendshipStatus } from "../../../friendship/type/status";

export type CustomFindByParam = {
  id?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  status?: FriendshipStatus;
};

export type FindWithReceiverParam = CustomFindByParam & {
  id: string;
};

export type FilterInputDataParam = CustomFindByParam;
