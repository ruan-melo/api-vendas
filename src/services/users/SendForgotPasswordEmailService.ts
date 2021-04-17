import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import UsersRepository from '../../repositories/UsersRepository';
import UsersTokensRepository from '../../repositories/UsersTokenRepository';

class SendForgotPasswordEmailService {
  async execute(email: string): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRepository = getCustomRepository(UsersTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('There is no user with email: ' + email, 404);
    }

    const userToken = await usersTokensRepository.generate(user.id);

    console.log(userToken);
  }
}

export default SendForgotPasswordEmailService;
