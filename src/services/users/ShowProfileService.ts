import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../models/User';
import UsersRepository from '../../repositories/UsersRepository';

class ShowProfileService {
  async execute(user_id: string): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}

export default ShowProfileService;
