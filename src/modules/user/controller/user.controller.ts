import {
  Controller,
  UseGuards,
  Body,
  Post,
  BadRequestException,
  Get,
  Query,
} from '@nestjs/common';

import { SignUpDto, SignUpDtoResponse } from '../dto/sign-up.dto';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { PostgresErrorCode } from '../../../core/enum';
import { UserListDto, UserListDtoResponse } from '../dto/user-list.dto';
import { UserEntity } from '../entity/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: 'sign up',
    description: 'sign up',
  })
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpDtoResponse> {
    try {
      await this.userService.signUp(signUpDto);
      return { success: true };
    } catch (e) {
      if (e?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('User with that email already exists');
      }
    }
  }

  @ApiOperation({
    summary: 'user list',
    description: 'get user list',
  })
  @Get('user')
  @UseGuards(JwtAuthGuard)
  async list(@Query() userListDto: UserListDto): Promise<UserListDtoResponse> {
    const users: UserEntity[] = await this.userService.list(userListDto);
    return { users };
  }
}
