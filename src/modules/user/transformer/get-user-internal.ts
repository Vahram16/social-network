import { plainToClass } from 'class-transformer';
import { UserByEmailInternalDto } from '../dto/user-by-email-Internal.dto';

export function getUserByEmailInternal(
  data: UserByEmailInternalDto,
): UserByEmailInternalDto {
  plainToClass(UserByEmailInternalDto, data);
  const getUserInternalDto: UserByEmailInternalDto =
    new UserByEmailInternalDto();
  getUserInternalDto.email = data.email;
  return getUserInternalDto;
}
