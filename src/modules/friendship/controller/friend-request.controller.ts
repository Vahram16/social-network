import { Controller, UseGuards, Post, Param, Patch } from '@nestjs/common';
import {
  SendFriendRequestDto,
  SendFriendRequestResponseDto,
} from '../dto/send-friend-request.dto';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { ReqUser } from '../../../core/decorators/req-user.decorator';
import { SessionJwtPayload } from '../../../core/type/session';
import { AcceptFriendRequestDto } from '../dto/accept-friend-request.dto';
import { RejectFriendRequestDto } from '../dto/reject-friend-request.dto';
import { FriendRequestService } from '../service/friend-request.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('friend')
@Controller('friend')
@UseGuards(JwtAuthGuard)
export class FriendRequestController {
  constructor(private friendshipService: FriendRequestService) {}

  @ApiOperation({
    summary: 'send friend request',
    description: 'send friend request',
  })
  @Post('/request/:receiverId')
  async sendFriendRequest(
    @Param() friendRequestDto: SendFriendRequestDto,
    @ReqUser() req: SessionJwtPayload,
  ): Promise<SendFriendRequestResponseDto> {
    const { receiverId } = friendRequestDto;
    return this.friendshipService.create(receiverId, req.id);
  }

  @ApiOperation({
    summary: 'accept friend request',
    description: 'send friend request',
  })
  @Patch('/request/accept/:requestId')
  async accept(
    @Param() acceptFriendRequestDto: AcceptFriendRequestDto,
    @ReqUser() user: SessionJwtPayload,
  ) {
    const { requestId } = acceptFriendRequestDto;
    return this.friendshipService.accept(requestId, user.id);
  }

  @ApiOperation({
    summary: 'reject friend request',
    description: 'reject friend request',
  })
  @Patch('/request/reject/:requestId')
  async reject(
    @Param() rejectFriendRequestDto: RejectFriendRequestDto,
    @ReqUser() user: SessionJwtPayload,
  ) {
    const { requestId } = rejectFriendRequestDto;
    return this.friendshipService.reject(requestId, user.id);
  }
}
