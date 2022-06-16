import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsInt,
} from 'class-validator';
import { Match } from '../../../core/decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  lastName: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsInt()
  age: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Match('password')
  passwordConfirm: string;
}

export class SignUpDtoResponse {
  @ApiProperty()
  success: boolean;
}
