import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../../errors/AppError';
import { isAfter, addHours } from 'date-fns';
import UsersRepository from '../../repositories/UsersRepository';
import UsersTokensRepository from '../../repositories/UsersTokenRepository';

interface Params {
  token: string;
  password: string;
}

class ResetPasswordService {
  async execute({ token, password }: Params): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRepository = getCustomRepository(UsersTokensRepository);

    const userToken = await usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token does not exists ', 409);
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist', 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired', 409);
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
