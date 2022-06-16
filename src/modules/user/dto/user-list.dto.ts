import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserEntity } from '../entity/user.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserListDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  age?: number;
}

export class UserListDtoResponse {
  users: UserEntity[];
}
