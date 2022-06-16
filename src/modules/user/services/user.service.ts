import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/userRepository/user-repository';
import { UserByEmailInternalDto } from '../dto/user-by-email-Internal.dto';
import { validateOrReject } from 'class-validator';
import { getUserByEmailInternal } from '../transformer/get-user-internal';
import { SignUpDto } from '../dto/sign-up.dto';
import { hashPassword } from '../../auth/util';
import { UserEntity } from '../entity/user.entity';
import { USER_REPOSITORY } from '../constants';
import { UserListDto } from '../dto/user-list.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {}

  async getUserInternalByEmail(data: UserByEmailInternalDto) {
    const getUserInternalDto: UserByEmailInternalDto =
      getUserByEmailInternal(data);
    try {
      await validateOrReject(getUserInternalDto);
    } catch (e) {
      throw e;
    }
    const { email } = getUserInternalDto;
    return this.userRepository.getByEmail(email);
  }

  async getUserInternalById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  list(data: UserListDto) {
    const { firstName, lastName, age } = data || {};
    // Most of all Expected to receive firstName, lastName and age combination, that's why these fields are combined indexes
    return this.userRepository.customFindBy({ firstName, lastName, age });
  }

  async signUp(data: SignUpDto) {
    const password = await hashPassword(data.password);
    const newUser: UserEntity = this.userRepository.create({
      firstName: data.firstName,
      email: data.email,
      age: Number(data.age),
      lastName: data.lastName,
      password,
    });

    return this.userRepository.save(newUser);
  }
}
