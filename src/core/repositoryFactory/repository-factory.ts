import { Repository } from 'typeorm';
export abstract class RepositoryFactory {
  abstract createRepository(): Repository<any>;
}
