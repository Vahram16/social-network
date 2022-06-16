import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { ReqUser } from '../../../core/decorators/req-user.decorator';
import { SessionJwtPayload } from '../../../core/type/session';
import { UserFriendService } from '../services/user-friend.service';
import { UserEntity } from '../entity/user.entity';
import { FriendListResponseDto } from '../dto/friend-list.dto';
import { UserFriendRequestListResponseDto } from '../dto/user-friend-request-list.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDtoResponse } from '../dto/sign-up.dto';

@ApiTags('user')
@Controller('user/friend')
export class UserFriendController {
  constructor(private userFriendService: UserFriendService) {}

  @ApiOperation({
    summary: 'friend list',
    description: 'get friend list',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async list(
    @ReqUser() user: SessionJwtPayload,
  ): Promise<FriendListResponseDto> {
    const friends: UserEntity[] = await this.userFriendService.list(user.id);
    const data = friends?.map((f) => {
      return {
        id: f.id,
        firstName: f.firstName,
        lastName: f.lastName,
        age: f.age,
      };
    });
    return { data };
  }

  @ApiOperation({
    summary: 'list request',
    description: 'get list request',
  })
  @Get('/request')
  @UseGuards(JwtAuthGuard)
  async requestList(
    @ReqUser() user: SessionJwtPayload,
  ): Promise<UserFriendRequestListResponseDto> {
    const response: Partial<UserEntity> =
      await this.userFriendService.requestList(user.id);
    if (!response?.receiverUser?.length) return { data: [] };
    const data = response.receiverUser.map((r) => {
      return {
        requestId: r.id,
        user: {
          id: r.requester.id,
          firstName: r.requester.firstName,
          lastName: r.requester.lastName,
          age: r.requester.age,
        },
      };
    });
    return { data };
  }
}
