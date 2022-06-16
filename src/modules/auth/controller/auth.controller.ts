import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthService } from '../service/auth.service';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const { email, password } = signInDto;
    return await this.authService.login({
      email,
      password,
    });
  }
}
