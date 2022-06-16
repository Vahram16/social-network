import {
  IsEmail,
} from 'class-validator';

export class UserByEmailInternalDto {
  @IsEmail()
  email: string;
}
