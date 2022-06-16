import { IsUUID } from 'class-validator';
import { MainUserResponseDto } from './main-user-response.dto';
import { ApiProperty } from "@nestjs/swagger";

export class FriendListDto {
  @IsUUID()
  friendRequestId: string;
}

export class FriendListResponseDto {
  @ApiProperty()
  data: MainUserResponseDto[];
}
