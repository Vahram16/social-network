import { plainToClass } from 'class-transformer';
import { SignInDto } from '../dto/sign-in.dto';

export function createSignInDto(data: SignInDto): SignInDto {
  plainToClass(SignInDto, data);
  const signInDto: SignInDto = new SignInDto();
  signInDto.email = data.email;
  signInDto.password = data.password;
  return signInDto;
}
