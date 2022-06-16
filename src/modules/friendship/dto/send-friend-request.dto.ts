import { IsUUID } from 'class-validator';

export class SendFriendRequestDto {
  @IsUUID()
  receiverId: string;
}

export class SendFriendRequestResponseDto {
  success: boolean;
  message?: string;
}
