import { hash, compare } from 'bcrypt';
import { appConfig } from '../../core/config';

export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, appConfig.salt);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await compare(password, hash);
};
