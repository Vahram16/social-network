import { IsUUID } from 'class-validator';

export class AcceptFriendRequestDto {
  @IsUUID()
  requestId: string;
}

export class AcceptFriendRequestResponseDto {
  success: boolean;
}
