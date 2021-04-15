import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { name },
    });
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { email },
    });
    return user;
  }
}

export default UsersRepository;
