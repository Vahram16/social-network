import { IsUUID } from 'class-validator';

export class RejectFriendRequestDto {
  @IsUUID()
  requestId: string;
}

export class RejectFriendRequestResponseDto {
  id: string;
}
