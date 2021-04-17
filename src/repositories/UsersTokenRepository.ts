import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../models/UserToken';

@EntityRepository(UserToken)
class UsersTokensRepository extends Repository<UserToken> {
  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: { token },
    });

    return userToken;
  }

  async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = this.create({ user_id });

    await this.save(userToken);

    return userToken;
  }
}

export default UsersTokensRepository;
