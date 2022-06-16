import { UserService } from '../../user/services/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { comparePassword } from '../util';
import { UserEntity } from '../../user/entity/user.entity';
import { JwtService } from '../../../providers/jwt/jwt.provider';
import { SignInDto, SignInResponseDto } from '../dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(data: SignInDto): Promise<SignInResponseDto> {
    const { email, password } = data;
    const user: UserEntity = await this.userService.getUserInternalByEmail({
      email,
    });
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect.');
    }
    const isPasswordEqual: boolean = await comparePassword(
      password,
      user.password,
    );
    if (!isPasswordEqual) {
      throw new UnauthorizedException('Email or password is incorrect.');
    }
    const { id, firstName } = user;
    const accessToken: string = await this.jwtService.createAccessToken({
      email,
      id,
      firstName,
    });
    return { accessToken };
  }
}
