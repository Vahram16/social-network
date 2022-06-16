import { MainUserResponseDto } from './main-user-response.dto';

type Response = {
  requestId: string;
  user: MainUserResponseDto;
};

export class UserFriendRequestListResponseDto {
  data: Response[];
}
